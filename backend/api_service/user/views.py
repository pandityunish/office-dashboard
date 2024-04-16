import base64
import os
from datetime import timedelta

from django.conf import settings
from django.contrib.auth.models import Permission
from django.core.files import File
from django.http import HttpResponse, FileResponse
from django.template.loader import get_template
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from xhtml2pdf import pisa

from . import usecases, serializers
from .models import CustomUser
from .serializers import (
    ChangePasswordSerializer,
    CustomUserSerializerLoginDetails,
    ForgotPasswordSerializer,
    ResendOTPSerializer,
    ResetPasswordSerializer,
    VerifyOTPSerializer, CustomUserUpdateSerializer, CustomUserImageUpdateSerializer, CustomUserSerializer,
)
from .utils import generate_otp, send_otp_to_user, generate_sms_text, send_email


@api_view(['GET'])
def get_all_permissions(request):
    all_permissions = Permission.objects.all()
    permission_list = [{'id': p.id, 'codename': p.codename, 'name': p.name} for p in all_permissions]
    return Response({'permissions': permission_list}, status=status.HTTP_200_OK)


class MobileNumberTokenObtainPairView(TokenObtainPairView):
    username_field = "mobile_number"


from django.utils.timezone import now


class RegisterUserView(generics.CreateAPIView):
    serializer_class = CustomUserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        email = user.email
        otp = generate_otp()
        text = generate_sms_text(otp)
        send_email(text, "verify your email", email)
        send_otp_to_user(user.mobile_number, text)
        user.otp = otp
        user.otp_created_at = now()
        user.save()
        return Response({"message": "OTP sent for verification"}, status=status.HTTP_201_CREATED)


class VerifyOTPView(generics.CreateAPIView):
    serializer_class = VerifyOTPSerializer

    def post(self, request, *args, **kwargs):
        mobile_number = request.data.get("mobile_number")
        otp = request.data.get("otp")
        try:
            user = CustomUser.objects.get(mobile_number=mobile_number, otp=otp)
        except CustomUser.DoesNotExist:
            raise ValidationError("Invalid mobile number or OTP")

        otp_expiry_time = user.otp_created_at + timedelta(minutes=10)

        if timezone.now() > otp_expiry_time:
            raise ValidationError("OTP has expired")
        user.is_sms_verified = True
        user.is_active = True
        user.admin_of_organization = True
        user.save()
        return Response({"message": "OTP verified successfully"}, status=status.HTTP_200_OK)


from user.models import Subscription
from django.utils import timezone


class LoginView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = serializers.LoginSerializer

    def perform_create(self, serializer):
        return usecases.LoginUseCase(
            serializer=serializer,
            request=self.request).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(response, status=status.HTTP_200_OK, headers=headers)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def SubsOfOrg(request):
    try:
        response_data = Subscription.objects.filter(user=request.user).values("subscription_id", "start_subscription",
                                                                              "end_subscription")
        return Response(response_data, status=status.HTTP_200_OK)
    except Subscription.DoesNotExist:
        raise ValidationError("No Subscription")


from user.serializers import CreateUserPermissionSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def AddStaffForORG(request):
    # Check if the user making the request is an admin of the organization
    if not request.user.admin_of_organization:
        return Response({'error': 'Only admin users can create accounts.'}, status=status.HTTP_403_FORBIDDEN)

    # Check if the request includes the necessary data
    if 'permissions' not in request.data:
        return Response({'error': 'Permissions field is required in the request data.'},
                        status=status.HTTP_400_BAD_REQUEST)

    # Extract permissions from the request data
    permission_codenames = request.data['permissions']

    # Validate and create the user using the serializer
    serializer = CreateUserPermissionSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()

        # Add dynamic permissions based on the request data
        permissions = Permission.objects.filter(codename__in=permission_codenames)
        user.user_permissions.set(permissions)

        return Response({'message': 'User registered successfully', 'user_id': user.id}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(generics.CreateAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = [permissions.AllowAny]
    queryset = ''

    def perform_create(self, serializer):
        return usecases.ForgetPasswordUseCase(serializer=serializer).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "Reset OTP sent for verification"}, status=status.HTTP_200_OK
        )


class ResetPasswordView(generics.UpdateAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):
        mobile_number = request.data.get("mobile_number")
        otp = request.data.get("otp")
        new_password = request.data.get("new_password")
        try:
            user = CustomUser.objects.get(mobile_number=mobile_number, otp=otp)
        except CustomUser.DoesNotExist:
            raise ValidationError("Invalid mobile number or reset OTP")

        otp_expiry_time = user.otp_created_at + timedelta(minutes=10)

        if timezone.now() > otp_expiry_time:
            raise ValidationError("OTP has expired")

        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Password reset successful"}, status=status.HTTP_200_OK
        )


class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not user.check_password(old_password):
            raise ValidationError("Invalid old password")

        user.set_password(new_password)
        user.save()

        return Response(
            {"message": "Password changed successfully"}, status=status.HTTP_200_OK
        )


class UserListView(generics.ListAPIView):
    serializer_class = CustomUserSerializer

    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        users = CustomUser.objects.all()
        return users

    def get(self, request, *args, **kwargs):
        users = self.get_queryset()
        serializer = self.serializer_class(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LoggedinUserDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        serializer = CustomUserSerializerLoginDetails(user)
        return Response(serializer.data)


class ResendOTPView(generics.CreateAPIView):
    serializer_class = ResendOTPSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        mobile_number = request.data.get("mobile_number")

        try:
            user = CustomUser.objects.get(
                mobile_number=mobile_number, is_sms_verified=False
            )
        except CustomUser.DoesNotExist:
            raise ValidationError("Invalid mobile number or user is already verified")

        otp = generate_otp()
        sms_text = (
            f"Welcome back to Epass! "
            f"Your verification code is: {otp}. "
            f"This code is valid for the next 10 minutes. "
            f"Enjoy using Epass!"
        )
        send_otp_to_user(user.mobile_number, sms_text)
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        return Response(
            {"message": "Resent OTP for verification"}, status=status.HTTP_200_OK
        )


# import qrcode
# from PIL import Image, ImageDraw, ImageFont
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class GenerateTestQR(APIView):
#     def get(self, request):
#         # Configure QR code
#         qr = qrcode.QRCode(
#             version=1,
#             error_correction=qrcode.constants.ERROR_CORRECT_H,
#             box_size=10,
#             border=4,
#         )

#         # Data to be encoded
#         data = "The data that you want to embed in the QR code"
#         qr.add_data(data)
#         qr.make(fit=True)

#         # Generate QR code and convert to an image object
#         img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')

#         # Resize the QR code to make it smaller
#         smaller_qr_size = (img_qr.width // 2, img_qr.height // 2)
#         img_qr = img_qr.resize(smaller_qr_size, Image.LANCZOS)

#         # Load the logo and resize it
#         logo_path = 'media/logo/epass.png'  # Path to the logo
#         logo = Image.open(logo_path)
#         logo_size = 40  # Size of the logo
#         logo.thumbnail((logo_size, logo_size), Image.LANCZOS)

#         # Calculate coordinates to place the logo at the center of the QR code
#         logo_pos = ((img_qr.size[0] - logo.size[0]) // 2, (img_qr.size[1] - logo.size[1]) // 2)
#         img_qr.paste(logo, logo_pos, mask=logo)

#         # Create a new image with padding for the final output
#         padding = 20
#         output_img_size = (img_qr.width + 2 * padding, img_qr.height + 100 + 2 * padding)  # 100 pixels for text
#         final_img = Image.new("RGB", output_img_size, "white")

#         # Paste the QR code onto the final image with padding
#         final_img.paste(img_qr, (padding, padding))

#         # Add text below the QR code
#         draw = ImageDraw.Draw(final_img)
#         font = ImageFont.truetype("media/logo/arial.ttf", 16)  # Adjust the font path and size

#         # Text data
#         # company_name = "eSewa"
#         tagline = "Adam pvt ltd"
#         phone_number = "078-575305"
#         instructions = "Scan QR for org detail"

#         # Calculate maximum width
#         max_text_width = max(
#             # font.getbbox(company_name, anchor="lt")[2],
#             font.getbbox(tagline, anchor="lt")[2],
#             font.getbbox(phone_number, anchor="lt")[2],
#             # font.getbbox(instructions, anchor="lt")[2]
#         )

#         # Text placement
#         text_x_position = (img_qr.width+50 - max_text_width) // 2
#         text_y_position = img_qr.height + 10 + padding

#         # draw.text((text_x_position, text_y_position), company_name, font=font, fill="black")
#         # text_y_position += 30

#         draw.text((text_x_position, text_y_position), tagline, font=font, fill="black")
#         text_y_position += 30
#         draw.text((text_x_position, text_y_position), phone_number, font=font, fill="black")

#         # Separate placement for "instructions"
#         instructions_x_position = (final_img.width - font.getbbox(instructions, anchor="lt")[2]) // 2

#         instructions_y_position = text_y_position + 50  # Adjust the vertical position as needed

#         draw.text((instructions_x_position, instructions_y_position), instructions, font=font, fill="black")

#         # Save the final image
#         path = "media/qr_test/image.png"
#         final_img.save(path)

#         return Response({"message": "qr", "path": path}, status=200)


# import qrcode
# from PIL import Image, ImageDraw, ImageFont
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class GenerateTestQR(APIView):
#     def get(self, request):
#         # Load the logo and resize it to make it bigger
#         logo_path = 'media/logo/epass.png'  # Path to the ePass logo
#         logo = Image.open(logo_path)
#         logo_size = 100  # Adjust the size of the logo to make it bigger
#         logo.thumbnail((logo_size, logo_size), Image.LANCZOS)

#         # Create a new image with padding for the final output
#         padding = 20
#         output_img_size = (logo.width + 2 * padding, logo.height + 400 + 2 * padding)  # 100 pixels for text
#         final_img = Image.new("RGB", output_img_size, "white")

#         # Paste the logo onto the final image at the top
#         final_img.paste(logo, (padding, padding))

#         # Configure QR code
#         qr = qrcode.QRCode(
#             version=1,
#             error_correction=qrcode.constants.ERROR_CORRECT_H,
#             box_size=5,  # Adjust the box size to make the QR code smaller
#             border=4,
#         )

#         # Data to be encoded
#         data = "The data that you want to embed in the QR code"
#         qr.add_data(data)
#         qr.make(fit=True)

#         # Generate QR code and convert to an image object
#         img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')

#         # Resize the QR code to make it smaller
#         smaller_qr_size = (img_qr.width // 2, img_qr.height // 2)
#         img_qr = img_qr.resize(smaller_qr_size, Image.LANCZOS)

#         # Create a new image with padding for the QR code and border
#         qr_padding = 3
#         qr_with_border_size = (img_qr.width + 2 * qr_padding, img_qr.height + 2 * qr_padding)
#         img_qr_with_border = Image.new("RGB", qr_with_border_size, "blue")

#         # Paste the QR code onto the image with padding and border
#         img_qr_with_border.paste(img_qr, (qr_padding, qr_padding))

#         # Calculate coordinates to place the QR code below the logo
#         qr_pos = ((final_img.width - img_qr_with_border.width) // 2, logo.height + padding * 2)
#         final_img.paste(img_qr_with_border, qr_pos)

#         # Add text below the QR code
#         draw = ImageDraw.Draw(final_img)
#         font = ImageFont.truetype("media/logo/arial.ttf", 16)  # Adjust the font path and size

#         # Text data
#         terminal_text = "Terminal No"
#         terminal_number = "299292993"

#         # Calculate text width
#         max_text_width = max(
#             font.getbbox(terminal_text, anchor="lt")[2],
#             font.getbbox(terminal_number, anchor="lt")[2]
#         )

#         # Text placement
#         text_x_position = (final_img.width - max_text_width) // 2
#         text_y_position = qr_pos[1] + img_qr_with_border.height + 10  # 10 pixels spacing

#         draw.text((text_x_position, text_y_position), terminal_text, font=font, fill="black")
#         text_y_position += 20  # Adjust the vertical position as needed
#         draw.text((text_x_position, text_y_position), terminal_number, font=font, fill="black")

#         # Save the final image
#         path = "media/qr_test/image.png"
#         final_img.save(path)

#         return Response({"message": "qr", "path": path}, status=200)


from rest_framework.views import APIView
from rest_framework.response import Response


class GenerateTestQR(APIView):
    def get(self, request):
        pass


from django.shortcuts import render
from api_service.settings import production
from organization.models import OrganizationKYC

from django.shortcuts import get_object_or_404


def qr_code_view(request, pk):
    try:
        if production:
            url = "https://api.epass.com.np/media/"
        else:
            url = "http://localhost:8000/media/"
        logo_path = "logo/epass.png"
        org_info = get_object_or_404(CustomUser, id=pk)
        org_details = get_object_or_404(OrganizationKYC, organization=pk)
        context = {
            'background_image_url': f"{url}{logo_path}" if logo_path else "",
            'terminal_number': f"{org_info.id}" if org_info.id is not None else "",
            'background_qr_url': f"{url}{org_info.qr}" if org_info.qr else "",
            'organization_name': org_info.organization_name if org_info.organization_name else "",
            'organization_location': f"{org_details.state},{org_details.district}" if org_details.state and org_details.district else "",
        }
        return render(request, 'qr_code.html', context)
    except CustomUser.DoesNotExist:
        return render(request, 'error.html', {'error_message': 'User not found'})
    except OrganizationKYC.DoesNotExist:
        return render(request, 'error.html', {'error_message': 'Organization details not found'})
    except Exception as e:
        return render(request, 'error.html', {'error_message': 'An unexpected error occurred'})


class UserUpdateView(generics.UpdateAPIView):
    serializer_class = CustomUserUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = CustomUser.objects.filter(pk=user_id).first()
        if not user:
            raise ValidationError({
                'error': 'Organization does not exist for given id'
            })
        return user

    def perform_update(self, serializer):
        return usecases.UserUpdateUseCase(
            instance=self.get_object(),
            serializer=serializer
        ).execute()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response("User updated successfully.")


class UserImageUpdateView(generics.UpdateAPIView):
    serializer_class = CustomUserImageUpdateSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = CustomUser.objects.filter(pk=user_id).first()
        if not user:
            raise ValidationError({
                'error': 'Organization does not exist for given id'
            })
        return user

    def perform_update(self, serializer):
        return usecases.UserImageUpdateUseCase(
            instance=self.get_object(),
            serializer=serializer
        ).execute()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response("Image updated successfully.")


class DownloadOrganizationQRCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, organization_id):
        organization_instance = CustomUser.objects.filter(
            pk=organization_id,
            is_organization=True
        ).first()
        if not organization_instance:
            raise ValidationError({"error": "Organization not found for given id."})

        return Response({
            "organization_id": organization_id,
            "qr_image": organization_instance.qr.url
        })


class DownloadVisitorQRCodeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, visitor_id):
        visitor_instance = CustomUser.objects.filter(
            pk=visitor_id,
            is_organization=False,
            is_visitor=True
        ).first()
        if not visitor_instance:
            raise ValidationError({"error": "Visitor  not found for given id."})

        return Response({
            "visitor_id": visitor_id,
            "qr_image": visitor_instance.qr.url
        })


class DeleteVisitorView(generics.DestroyAPIView):
    def get_object(self):
        visitor_instance = CustomUser.objects.filter(
            pk=self.kwargs['visitor_id'],
            is_organization=False,
            is_visitor=True
        ).first()
        if not visitor_instance:
            raise ValidationError({"error": "Visitor not found for given id. "})

    def perform_destroy(self, instance):
        instance.delete()


class ListALluser(generics.ListAPIView):
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        return CustomUser.objects.all()


class DownloadVisitorPDFView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Retrieve path parameters from kwargs
        visitor_instance = CustomUser.objects.filter(
            pk=self.kwargs['visitor_id'],
            is_organization=False,
            is_visitor=True
        ).first()
        if not visitor_instance:
            raise ValidationError({"error": "Visitor not found for given id. "})
        template = get_template('visitor_details.html')
        html = template.render({'visitor': visitor_instance})

        pdf_response = HttpResponse(content_type='application/pdf')
        pdf_response['Content-Disposition'] = 'attachment; filename="visitor_details.pdf"'

        # Generate PDF from HTML content
        pisa.CreatePDF(html, dest=pdf_response)

        return pdf_response
