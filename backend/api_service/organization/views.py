import csv
import os

from django.template.loader import get_template
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from xhtml2pdf import pisa

from . import serializers, usecases
from .filters import OrganizationBranchFilter, OrganizationVisitHistoryFilter
from .serializers import (  # OrganizationSerializer,
    BranchSerializer,
    DocumentSerializer,
    OrganizationCreateSerializer,
    OrganizationKYCSerializer,
    OrganizationListSerializer,
    OrganizationSettingsSerializer,
    OrganizationVisitHistorySerializer,
    SocialMediaLinkSerializer,
    OrganizationNameListSerializer, AdsBannerSerializer, CreateOrganizationKYCSerializer, ListOrganizationKYCSerializer,
    OrganizationBranchSerializer, ListOrganizationBranchSerializer, UpdateOrganizationKYCLogoSerializer,
    CreateOrganizationKYCSerializer, CreateOrganizationKycSerializer, OrganizationListKYCSerializer,
    ScanOrganizationByVisitorSerializer, VisitorDataSerializer, ManualOrganizationEntrySerializer,
    VisitorCountsSerializer, VisitorDataForPdfSerializer
)
from .models import (
    OrganizationBranch,
    OrganizationDocument,
    OrganizationKYC,
    OrganizationSocialMediaLink,
    OrganizationVisitHistory, AdsBanner,
)
from user.serializers import CustomUserSerializer
from organization.serializers import OrganizationGetSerializer
import json
from datetime import timedelta

import qrcode
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.http import HttpResponse
from django.utils import timezone
from django.utils.crypto import get_random_string
from notification.models import Notification
from notification.serializers import NotificationSerializer
from rest_framework import status, parsers
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from user.utils import generate_otp, send_otp_to_user

from django.apps import apps
from django.db import models

from user.models import CustomUser

from common.permissions import IsVisitingUser

User = get_user_model()

from django_filters import rest_framework as filters
from rest_framework import generics
from django.db.models import Q

from rest_framework.filters import SearchFilter

import datetime
from django.http import JsonResponse
from django.views import View
from django.db.models import Count
from django.db.models.functions import TruncDate
from .models import OrganizationVisitHistory

from rest_framework.pagination import PageNumberPagination


class PageNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class UserFilter(filters.FilterSet):
    search = filters.CharFilter(method='filter_search')

    class Meta:
        model = get_user_model()
        fields = ['search']

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(full_name__icontains=value) |
            Q(mobile_number__icontains=value) |
            Q(email__icontains=value) |
            Q(organization_type__icontains=value) |
            Q(organization_name__icontains=value)
        )


class OrganizationsList(generics.ListAPIView):
    # permission_classes = [IsAuthenticated]
    serializer_class = OrganizationListSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = UserFilter
    pagination_class = PageNumberPagination

    def get_queryset(self):
        # organizations = CustomUser.objects.filter(id=self.request.user.id,is_organization=True).order_by('-id')
        organizations = CustomUser.objects.filter(is_organization=True).order_by('-id')
        return organizations


class OrganizationGet(generics.ListAPIView):
    permission_classes = []
    serializer_class = OrganizationGetSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        organizations = CustomUser.objects.filter(id=pk)
        return organizations


# class OrganizationsList(APIView):
#     permission_classes = []

#     def get(self, request):
#         organizations = User.objects.filter(is_organization=True).order_by('-id')

#         serializer = OrganizationListSerializer(organizations, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

class OrganizationCreate(APIView):
    def post(self, request):
        serializer = OrganizationCreateSerializer(data=request.data)
        if serializer.is_valid():
            organization_user = serializer.save()
            otp = generate_otp()
            sms_text = (
                f"Welcome to Epass! Thank you for registering. "
                f"Your verification code is: {otp}. "
                f"This code is valid for the next 10 minutes. "
                f"Enjoy using Epass!"
            )
            res = send_otp_to_user(serializer.validated_data.get("mobile_number"), sms_text)
            organization_user.otp = otp
            organization_user.otp_created_at = timezone.now()
            organization_user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationOTPVerify(APIView):
    def post(self, request, *args, **kwargs):
        mobile_number = request.data.get("mobile_number")
        otp = request.data.get("otp")

        try:
            organization = User.objects.get(
                mobile_number=mobile_number,
                otp=otp,
                is_organization=True,
            )
        except User.DoesNotExist:
            raise ValidationError(
                "Invalid mobile number, OTP, or organization")

        otp_expiry_time = organization.otp_created_at + timedelta(minutes=10)

        if timezone.now() > otp_expiry_time:
            raise ValidationError("OTP has expired")

        organization.is_sms_verified = True
        organization.is_active = True
        organization.admin_of_organization = True

        organization.save()

        return Response(
            {"message": "Organization verified successfully"}, status=status.HTTP_200_OK
        )


class OrganizationKYCVerify(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request):
        serializer = OrganizationKYCSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.filter(id=request.user.id).first()

            notification_data = {
                "user": request.user.id,
                "name": request.user.full_name,
                "message": f"Congratulations!! Kyc Verified Successfully, Welcome to Epass,",
            }
            notification_serializer = NotificationSerializer(
                data=notification_data)

            if notification_serializer.is_valid():
                notification_serializer.save()

            user.is_kyc_verified = True
            user.save()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationKYCDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return OrganizationKYC.objects.get(pk=pk)
        except OrganizationKYC.DoesNotExist:
            return None

    def get(self, request, pk):
        organization_kyc = self.get_object(pk)
        if organization_kyc is not None:
            serializer = OrganizationKYCSerializer(organization_kyc)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"detail": "OrganizationKYC not found"}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        organization_kyc = self.get_object(pk)
        serializer = OrganizationKYCSerializer(
            organization_kyc, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MYOrganizationKYCDetail(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        try:
            kyc = OrganizationKYC.objects.get(organization=user)
            serializer = OrganizationKYCSerializer(kyc)
            return Response(serializer.data)
        except OrganizationKYC.DoesNotExist:
            return Response(
                {"detail": "Organization KYC not found for this user."},
                status=400,
            )


from organization.serializers import BranchSerializerGet


class BranchList(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        # Get query parameters for pagination and search
        page = request.query_params.get('page', 1)
        page_size = request.query_params.get('page_size', 10)
        search_query = request.query_params.get('search', '')

        # Get the model and fields to search dynamically
        model = apps.get_model('organization', 'OrganizationBranch')
        fields_to_search = [field.name for field in model._meta.get_fields() if isinstance(field, models.CharField)]

        # Filter branches based on the organization and search query
        branches = model.objects.filter(organization=request.user.id, lock_branch="Active")

        if search_query:
            search_filter = Q()
            for field in fields_to_search:
                search_filter |= Q(**{f"{field}__icontains": search_query})

            branches = branches.filter(search_filter)

        # Paginate the results
        paginator = PageNumberPagination()
        paginated_branches = paginator.paginate_queryset(branches, request)

        # Serialize and return the paginated branches
        serializer = BranchSerializerGet(paginated_branches, many=True)
        return paginator.get_paginated_response(serializer.data)

        # branches = OrganizationBranch.objects.all()
        # branches = OrganizationBranch.objects.filter(organization=request.user.id)
        # serializer = BranchSerializer(branches, many=True)
        # return Response(serializer.data)

    def post(self, request, format=None):
        data = request.data.copy()
        data["organization"] = request.user.id
        serializer = BranchSerializer(data=data, context={"request": request})

        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)

        notification_data = {
            "user": request.user.id,
            "name": request.user.full_name,
            "message": f"{serializer.validated_data.get('name')} Branch was created Successfully",
        }
        notification_serializer = NotificationSerializer(data=notification_data)

        if notification_serializer.is_valid():
            notification_serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoggedInOrganizationBranchList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    authentication_classes = [JWTAuthentication]

    def get(self, request):
        branches = OrganizationBranch.objects.filter(
            organization=request.user.id, lock_branch="Act")
        serializer = BranchSerializer(branches, many=True)
        return Response(serializer.data)


from django.http import Http404


class BranchDetail(APIView):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            # return OrganizationBranch.objects.get(organization=self.request.user.id, id=pk, lock_branch="Active")
            return OrganizationBranch.objects.get(organization=self.request.user.id, id=pk)
        except OrganizationBranch.DoesNotExist:
            raise Http404("Organization branch not found")

    def edit_object(self, pk):
        try:
            return OrganizationBranch.objects.get(organization=self.request.user.id, id=pk)
            # return OrganizationBranch.objects.get(organization=self.request.user.id, id=pk, lock_branch="Active")
        except OrganizationBranch.DoesNotExist:
            raise Http404("Organization branch not found")

    def get(self, request, pk):
        branch = self.get_object(pk)
        serializer = BranchSerializerGet(branch)
        return Response(serializer.data)

    def patch(self, request, pk):
        if request.data.get('organization', None):
            return Response({"message": "organization cannot be edited"}, status=status.HTTP_400_BAD_REQUEST)
        branch = self.edit_object(pk)
        serializer = BranchSerializer(branch, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        branch = self.edit_object(pk)
        branch.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SocialMediaLinkList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        social_media_links = OrganizationSocialMediaLink.objects.all()
        serializer = SocialMediaLinkSerializer(social_media_links, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SocialMediaLinkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SocialMediaLinkDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return OrganizationSocialMediaLink.objects.get(pk=pk)
        except OrganizationSocialMediaLink.DoesNotExist:
            return Response({"Links not found"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        social_media_link = self.get_object(pk)
        serializer = SocialMediaLinkSerializer(social_media_link)
        return Response(serializer.data)

    def put(self, request, pk):
        social_media_link = self.get_object(pk)
        serializer = SocialMediaLinkSerializer(
            social_media_link, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        social_media_link = self.get_object(pk)
        social_media_link.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DocumentList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        documents = OrganizationDocument.objects.all()
        serializer = DocumentSerializer(documents, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DocumentDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_object(self, pk):
        try:
            return OrganizationDocument.objects.get(pk=pk)
        except OrganizationDocument.DoesNotExist:
            return Response({"Documents not found"}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, pk):
        document = self.get_object(pk)
        serializer = DocumentSerializer(document)
        return Response(serializer.data)

    def put(self, request, pk):
        document = self.get_object(pk)
        serializer = DocumentSerializer(document, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        document = self.get_object(pk)
        document.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


def create_org_qr(request):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data("org:10011")
    qr.make(fit=True)

    img = qr.make_image(fill_color="blue", back_color="white")

    response = HttpResponse(content_type="image/png")
    img.save(response, "PNG")
    return response


class ScanOrg(APIView):
    permission_classes = [IsAuthenticated, ]

    def post(self, request, format=None):
        # visitor_id = request.data.get("visitor")
        visitor_id = request.user.id
        mobile_number = request.data.get("mobile_number")
        organization_id = request.data.get("organization")
        full_name = request.data.get("full_name")

        if not (visitor_id or mobile_number):
            return Response({"error": "Either 'visitor_id' or 'mobile_number' is required"},
                            status=status.HTTP_400_BAD_REQUEST, )

        try:
            organization = User.objects.get(id=organization_id, is_organization=True)
        except User.DoesNotExist:
            return Response({"error": "Organization not found, try again"}, status=status.HTTP_404_NOT_FOUND, )

        visitor = None

        try:
            visitor = User.objects.get(id=visitor_id)
        except User.DoesNotExist:
            visitor = None

        if visitor is None and mobile_number:
            if not full_name:
                return Response({"error": "Fullname is required"}, status=status.HTTP_400_BAD_REQUEST, )

            try:
                visitor = User.objects.get(mobile_number=mobile_number)
            except User.DoesNotExist:
                random_password = get_random_string(6)
                visitor_data = {
                    "mobile_number": mobile_number,
                    "password": make_password(random_password),
                    "full_name": full_name,
                }
                visitor_serializer = CustomUserSerializer(data=visitor_data)

                if visitor_serializer.is_valid():
                    visitor_serializer.save()
                    visitor = visitor_serializer.instance
                else:
                    return Response(visitor_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        visit_data = {
            "organization": organization.id,
            "visitor": visitor.pk,
            "purpose": request.data.get("purpose"),
            "mobile_number": visitor.mobile_number
            if visitor.mobile_number
            else request.data.get("mobile_number"),
            "have_vehicle": request.data.get("have_vehicle"),
            "full_name": request.data.get("full_name", visitor.full_name),
            "vehicle_number": request.data.get("vehicle_number"),
            "is_with_team": request.data.get("is_with_team"),
            "number_team": request.data.get("number_team"),
            "visiting_from": request.data.get("visiting_from"),
            "is_approved": organization.approve_visitors,
            "departed_at": None if organization.check_in_check_out_feature else None,
            "type_of_id": request.data.get("type_of_id", None),
            "id_number": request.data.get("id_number", None),
            "email": request.data.get("email", None),
            "remarks": request.data.get("remarks", None),
            "photo": request.data.get("photo", None),
        }

        organization_visit_history_serializer = OrganizationVisitHistorySerializer(data=visit_data)
        if organization_visit_history_serializer.is_valid():
            organization_visit_history_serializer.save()
            return Response(organization_visit_history_serializer.data, status=status.HTTP_201_CREATED, )
        else:
            return Response(organization_visit_history_serializer.errors, status=status.HTTP_400_BAD_REQUEST, )


from user.utils import generate_otp, send_otp_to_user
from user.views import generate_sms_text


class ScanOrganizationView(generics.CreateAPIView):
    serializer_class = ScanOrganizationByVisitorSerializer
    permission_classes = [IsVisitingUser]

    def get_object(self):
        _id = self.kwargs.get('organization_id')
        organization = User.objects.filter(
            pk=_id,
            is_organization=True
        ).first()
        if not organization:
            raise ValidationError(
                {
                    "error": "Organization does not exist for given id or given id is not of organization."
                }
            )
        return organization

    def perform_create(self, serializer):
        return usecases.ScanOrganizationUseCase(
            serializer=serializer,
            request=self.request,
            instance=self.get_object()
        ).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.perform_create(serializer)
        return Response(response, status=status.HTTP_201_CREATED)


class ListVisitorDataView(generics.ListAPIView):
    """
    use this api to list all organization visited by user
    """
    serializer_class = VisitorDataSerializer

    permission_classes = [IsVisitingUser]

    def get_queryset(self):
        return OrganizationVisitHistory.objects.filter(
            visitor=self.request.user
        ).select_related(
            'visitor',
            'organization'
        )


class ManualEntryVisitorView(generics.CreateAPIView):
    serializer_class = ManualOrganizationEntrySerializer

    permission_classes = []

    def get_object(self):
        _id = self.kwargs.get('organization_id')
        organization = User.objects.filter(
            pk=_id,
            is_organization=True
        ).first()
        if not organization:
            raise ValidationError(
                {
                    "error": "Organization does not exist for given id or given id is not of organization."
                }
            )
        return organization

    def perform_create(self, serializer):
        return usecases.ManualEntryOfVisitorUseCase(
            instance=self.get_object(),
            serializer=serializer
        ).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = self.perform_create(serializer)
        return Response(response, status=status.HTTP_201_CREATED)


class manualEntryVisitorsFirstStep(APIView):
    # permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        # visitor_id = request.user.id
        mobile_number = request.data.get("mobile_number")
        email = request.data.get("email", None)
        organization_id = request.data.get("organization")
        full_name = request.data.get("full_name")
        purpose = request.data.get("purpose")
        number_team = request.data.get("number_team")
        address = request.data.get("address")
        visiting_from = request.data.get("visiting_from")

        if not (
                full_name and mobile_number and address and organization_id and purpose and number_team and visiting_from):
            return Response({
                "error": " 'full_name' & 'mobile_number' & 'Address' & 'organization' & 'email' & 'purpose' & 'number_team' & 'visiting_from' is required"},
                status=status.HTTP_400_BAD_REQUEST, )
        try:
            otp = generate_otp()
            '''
                user created first and send otp for verification
            '''
            user = CustomUser.objects.create(
                mobile_number=mobile_number,
                full_name=full_name,
                email=email,
                is_organization=False,
            )
            send_otp_to_user(user.mobile_number, generate_sms_text(otp))
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()
            return Response({"message": "We send you an otp , verify you number to visit organization"}, status=200)
        except:
            return Response({"message": "You can login directly with logged in if you visited early"},
                            status=status.HTTP_400_BAD_REQUEST, )


from rest_framework_simplejwt.tokens import RefreshToken


class manualEntryVisitorsSecondStep(APIView):
    def post(self, request, format=None):

        mobile_number = request.data.get("mobile_number")
        organization_id = request.data.get("organization")
        purpose = request.data.get("purpose")
        number_team = request.data.get("number_team")
        visiting_from = request.data.get("visiting_from")
        address = request.data.get("address")
        otp = request.data.get("otp")

        if not (mobile_number and address and organization_id and purpose and number_team and visiting_from and otp):
            return Response({
                "error": " 'mobile_number' & 'address' & 'otp' & 'organization' & 'purpose' & 'number_team' & 'visiting_from' is required"},
                status=status.HTTP_400_BAD_REQUEST, )

        '''
        verify otp token
        '''
        try:
            user = CustomUser.objects.get(otp=otp, mobile_number=mobile_number)
            user.is_sms_verified = True
            user.is_active = True
            user.save()
        except:
            return Response({"error": "check you token"}, status=status.HTTP_400_BAD_REQUEST, )

        ''' check org '''
        try:
            organization = User.objects.get(id=organization_id, is_organization=True)
        except:
            return Response({"error": "ORG. does't exits"}, status=status.HTTP_400_BAD_REQUEST, )

        ''' Get the ORG and user data and make a visitor request in an ORG. '''
        visitor = user.id
        visitor_id = user.id

        try:
            visitor = User.objects.get(id=visitor_id)
        except:
            visitor = None
            return Response({"error": "User doesn't exits"}, status=status.HTTP_400_BAD_REQUEST, )

        full_name = user.full_name

        if visitor is None and mobile_number:
            if not full_name:
                return Response({"error": "Fullname is required"}, status=status.HTTP_400_BAD_REQUEST, )

        visitor = User.objects.get(mobile_number=mobile_number)
        visit_data = {
            "organization": organization.id,
            "visitor": visitor.pk,
            "purpose": request.data.get("purpose"),
            "mobile_number": visitor.mobile_number
            if visitor.mobile_number
            else request.data.get("mobile_number"),
            "have_vehicle": request.data.get("have_vehicle"),
            "full_name": request.data.get("full_name", visitor.full_name),
            "vehicle_number": request.data.get("vehicle_number"),
            "is_with_team": request.data.get("is_with_team"),
            "number_team": request.data.get("number_team"),
            "visiting_from": request.data.get("visiting_from"),
            "is_approved": organization.approve_visitors,
            "departed_at": None if organization.check_in_check_out_feature else None,
        }
        organization_visit_history_serializer = OrganizationVisitHistorySerializer(data=visit_data)
        if organization_visit_history_serializer.is_valid():
            organization_visit_history_serializer.save()
            refresh = RefreshToken.for_user(user)

            response_data = {
                "data": organization_visit_history_serializer.data,
                "token": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(organization_visit_history_serializer.errors, status=status.HTTP_400_BAD_REQUEST, )


class OrganizationVisitHistoryListView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request, pk):
        visit_history = OrganizationVisitHistory.objects.filter(organization=pk).all()
        serializer = OrganizationVisitHistorySerializer(visit_history, many=True)
        return Response(serializer.data)


class LoggedinOrganizationDataView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)


class ApproveVisitorView(APIView):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:

            is_approved = request.data.get('is_approved', None)
            visit_id = request.data.get('visit_id', None)
            if not visit_id:
                response_data = {"error": "visit_id is required"}
                return Response(response_data)

            if not is_approved:
                response_data = {"error": "is_approved is required"}
                return Response(response_data)

            visit_history = OrganizationVisitHistory.objects.filter(pk=visit_id).first()
            if visit_history.organization.id == request.user.id:
                visit_history.is_approved = is_approved
                visit_history.save()
                response_data = {"message": "Visitor approved successfully"}
                return Response(response_data)
            else:
                response_data = {"error": "You are not authorized to approve this visitor"}
                return Response(response_data)

        except Exception as e:
            response_data = {"error": str(e)}
            return Response(response_data)


class OrganizationSettingsView(generics.CreateAPIView):
    serializer_class = OrganizationSettingsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self):
        _id = self.kwargs.get('organization_id')
        organization = User.objects.filter(
            pk=_id,
            is_organization=True
        ).first()
        if not organization:
            raise ValidationError(
                {
                    "error": "Organization does not exist for given id or given id is not of organization."
                }
            )
        return organization

    def perform_create(self, serializer):
        return usecases.OrganizationSettingsUseCase(
            serializer=serializer,
            instance=self.get_object()
        ).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response("Settings changed successfully", status=status.HTTP_201_CREATED, headers=headers)



class OrganizationNameListView(APIView):
    def get(request, response):
        organization = User.objects.filter(is_organization=True).all()
        serializer = OrganizationNameListSerializer(organization, many=True)
        return Response(serializer.data)


# class OrganizationVisitStatisticsView(View):
#     def get(self, request, organization_id):

#         start_date=request.GET.get('start_date',None)
#         end_date=request.GET.get('end_date',None)

#         # If start_date or end_date is not provided, return all data without filtering by date
#         if not start_date or not end_date:
#             queryset = OrganizationVisitHistory.objects.filter(organization_id=organization_id)
#             if request.GET.get('purpose',None):
#                 queryset = OrganizationVisitHistory.objects.filter(organization_id=organization_id,purpose=request.GET.get('purpose',None))

#         else:
#             # Convert start_date and end_date from string to datetime objects
#             start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
#             end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()

#             # Filter the queryset based on the date range
#             queryset = OrganizationVisitHistory.objects.filter(
#                 organization_id=organization_id,
#                 visited_at__date__range=[start_date, end_date]
#             )

#             if request.GET.get('purpose',None):
#                 queryset = OrganizationVisitHistory.objects.filter(
#                     organization_id=organization_id,
#                     purpose=request.GET.get('purpose',None),
#                     visited_at__date__range=[start_date, end_date]
#                     )

#         queryset = queryset.annotate(truncated_date=TruncDate('visited_at'))

#         # Group by truncated date and count the visits
#         visit_stats = queryset.values('truncated_date').annotate(total_visit=Count('id'))

#         # Map day_of_week to human-readable day names
#         day_mapping = {
#             0: 'Sunday',
#             1: 'Monday',
#             2: 'Tuesday',
#             3: 'Wednesday',
#             4: 'Thursday',
#             5: 'Friday',
#             6: 'Saturday',
#         }

#         # Create the final response format
#         response_data = [
#             {
#                 "label": day_mapping.get(stats['truncated_date'].weekday(), 'Unknown'),
#                 "date": stats['truncated_date'].strftime('%Y-%m-%d'),
#                 "totalvisit": stats['total_visit']
#             }
#             for stats in visit_stats
#         ]

#         return JsonResponse(response_data, safe=False)


from django.db.models import Count, Case, When, Value, IntegerField, Sum
from django.db.models.functions import TruncDate
from django.http import JsonResponse
from django.views import View


class OrganizationVisitStatisticsView(View):
    def get(self, request, organization_id):
        start_date = request.GET.get('start_date', None)
        end_date = request.GET.get('end_date', None)

        # If start_date or end_date is not provided, return all data without filtering by date
        queryset = OrganizationVisitHistory.objects.filter(organization_id=organization_id)

        if start_date and end_date:
            # Convert start_date and end_date from string to datetime objects
            start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
            end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()

            # Filter the queryset based on the date range
            queryset = queryset.filter(
                visited_at__date__range=[start_date, end_date]
            )

        # Annotate check_in and check_out based on the presence of departed_at
        queryset = queryset.annotate(
            truncated_date=TruncDate('visited_at'),
            check_in=Count(Case(When(departed_at__isnull=True, then=Value(1)), output_field=IntegerField())),
            check_out=Count(Case(When(departed_at__isnull=False, then=Value(1)), output_field=IntegerField())),
        )

        # Group by truncated date and count the visits
        visit_stats = queryset.values('truncated_date').annotate(
            total_visit=Count('id'),
            check_in=Sum(Case(When(departed_at__isnull=True, then=Value(1)), default=0, output_field=IntegerField())),
            check_out=Sum(Case(When(departed_at__isnull=False, then=Value(1)), default=0, output_field=IntegerField())),
        )

        # Map day_of_week to human-readable day names
        day_mapping = {
            0: 'Monday',
            1: 'Tuesday',
            2: 'Wednesday',
            3: 'Thursday',
            4: 'Friday',
            5: 'Saturday',
            6: 'Sunday',
        }

        # Create the final response format
        response_data = [
            {
                "label": day_mapping.get(stats['truncated_date'].weekday(), 'Unknown'),
                "date": stats['truncated_date'].strftime('%Y-%m-%d'),
                "check_in": stats['check_in'],
                "check_out": stats['check_out'],
                "totalvisit": stats['total_visit'],
            }
            for stats in visit_stats
        ]

        return JsonResponse(response_data, safe=False)


from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import OrganizationKYC
from .serializers import NewOrganizationKYCSerializer, GetNewOrganizationKYCSerializer


class OrganizationKYCViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        queryset = OrganizationKYC.objects.get(organization=request.user)
        serializer = GetNewOrganizationKYCSerializer(queryset)
        return Response(serializer.data)

    def create(self, request):
        try:
            if OrganizationKYC.objects.get(organization=request.user):
                return Response({"message": "Already register KYC"}, status=400)
        except:
            request.data['organization'] = request.user.id
            serializer = NewOrganizationKYCSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        instance = OrganizationKYC.objects.get(pk=pk)
        serializer = NewOrganizationKYCSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


from rest_framework import generics
from .models import Device
from .serializers import DeviceSerializer

from rest_framework.decorators import api_view


@api_view(['GET', 'DELETE'])
def device_list_view(request):
    if request.method == 'GET':
        try:
            if request.user.email:
                queryset = Device.objects.filter(organization=request.user)
                serializer = DeviceSerializer(queryset, many=True)
                return Response(serializer.data)
        except:
            return Response({'message': 'User not found'}, status=400)

    if request.method == 'DELETE':
        try:
            if request.data.get('id', None):
                device = Device.objects.get(id=request.data['id'])
                device.delete()
                return Response({'message': 'Device deleted successfully'}, status=200)
            return Response({'message': 'Data  not found'}, status=400)
        except:
            return Response({'message': 'Data  not found'}, status=400)

    return Response({'message': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


from rest_framework import viewsets
from .models import Purpose
from .serializers import PurposeSerializer

from .models import Purpose
from .serializers import PurposeSerializer
from rest_framework.response import Response
from rest_framework import status


class PurposeViewSet(viewsets.ModelViewSet):
    serializer_class = PurposeSerializer

    def get_queryset(self):
        return Purpose.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        return Response({"detail": "Method 'POST' not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def retrieve(self, request, *args, **kwargs):
        return Response({"detail": "Method 'GET' not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def update(self, request, *args, **kwargs):
        return Response({"detail": "Method 'PUT' not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        return Response({"detail": "Method 'PATCH' not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def destroy(self, request, *args, **kwargs):
        return Response({"detail": "Method 'DELETE' not allowed"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


from .models import OrganizationContent
from .serializers import OrganizationContentSerializer


class OrganizationContentAPIView(generics.ListAPIView):
    serializer_class = OrganizationContentSerializer

    def get_queryset(self):
        return OrganizationContent.objects.filter(organization=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class AdsBannerListAPIView(generics.ListAPIView):
    serializer_class = serializers.ListAdsBannerSerializer

    def get_queryset(self):
        return AdsBanner.objects.all()


class AdsBannerCreateAPIView(generics.CreateAPIView):
    serializer_class = AdsBannerSerializer

    def perform_create(self, serializer):
        ads_banner = AdsBanner(
            **serializer.validated_data
        )
        ads_banner.save()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            "Ads Banner created successfully",
            status=status.HTTP_201_CREATED,
            headers=headers
        )


class AdsBannerDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AdsBanner.objects.all()
    serializer_class = AdsBannerSerializer


class ListKYCView(generics.ListAPIView):
    serializer_class = ListOrganizationKYCSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        custom_user = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if custom_user is None:
            raise ValidationError(
                {
                    'error': 'Organization does not exist.'
                }
            )
        return custom_user

    def get_queryset(self):
        return OrganizationKYC.objects.filter(
            organization=self.get_object(),
        ).select_related('organization')


class DownloadBranchExcelView(APIView):
    def get_object(self):
        user = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not user:
            raise ValidationError(
                {
                    'error': 'Organization does not exist for given id'
                }
            )
        return user

    def get(self, request, *args, **kwargs):
        return usecases.DownloadBranchExcelUseCase(instance=self.get_object()).execute()


class CreateOrganizationBranchView(generics.CreateAPIView):
    serializer_class = OrganizationBranchSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        organization = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization does not exist for given id'
                }
            )
        return organization

    def perform_create(self, serializer):
        return usecases.CreateOrganizationBranchUseCase(
            instance=self.get_object(),
            serializer=serializer,
            request=self.request
        ).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response("Organization Branch Created successfully.", status=status.HTTP_201_CREATED, headers=headers)


class ListOrganizationBranchView(generics.ListAPIView):
    serializer_class = ListOrganizationBranchSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend]
    filterset_class = OrganizationBranchFilter

    def get_object(self):
        organization = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization does not exist for given id'
                }
            )
        return organization

    def get_queryset(self):
        return OrganizationBranch.objects.filter(organization=self.get_object())


class UpdateOrganizationKYCLogoView(generics.UpdateAPIView):
    serializer_class = UpdateOrganizationKYCLogoSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        _id = self.kwargs.get('organization_kyc_id')
        organization_kyc = OrganizationKYC.objects.filter(pk=_id).first()
        if not organization_kyc:
            raise ValidationError(
                {
                    'error': 'Organization KYC does not exists'
                }
            )
        return organization_kyc

    def perform_update(self, serializer):
        instance = self.get_object()
        for field in serializer.validated_data:
            setattr(instance, field, serializer.validated_data[field])
        instance.save()


class CreateOrganizationKYCView(generics.CreateAPIView):
    serializer_class = CreateOrganizationKycSerializer

    def get_object(self):
        organization = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization Doesnot exists for given id.'
                }
            )
        return organization

    def perform_create(self, serializer):
        return usecases.CreateOrganizationKYCUseCase(
            instance=self.get_object(),
            serializer=serializer,
            request=self.request
        ).execute()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            "Organization Kyc successfully created",
            status=status.HTTP_201_CREATED
        )


class OrganizationKYCListView(generics.ListAPIView):
    serializer_class = OrganizationListKYCSerializer

    def get_object(self):
        organization = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization Doesnot exists for given id.'
                }
            )
        return organization

    def get_queryset(self):
        return OrganizationKYC.objects.filter(
            organization=self.get_object()
        )


class OrganizationKYCDetailView(generics.RetrieveAPIView):
    serializer_class = OrganizationListKYCSerializer

    def get_object(self):
        organization_kyc = OrganizationKYC.objects.filter(
            pk=self.kwargs.get('organization_kyc_id')
        ).first()
        if not organization_kyc:
            raise ValidationError(
                {
                    'error': 'OrganizationKyc Does not exists for given id.'
                }
            )
        return organization_kyc


class DownloadVisitHistoryCSV(APIView):
    """
    API endpoint to download visit history data as CSV.
    """

    def get(self, request, *args, **kwargs):
        visit_histories_instance = OrganizationVisitHistory.objects.filter(
            organization=self.kwargs.get('organization_id')
        ).first()

        if not visit_histories_instance:
            raise ValidationError(
                {
                    'error': 'Organization Does not exists for given id.'
                }
            )
        visit_histories = OrganizationVisitHistory.objects.filter(
            organization=self.kwargs.get('organization_id')
        )

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="visit_history.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Organization', 'Visitor', 'Full Name', 'Email', 'Mobile Number', 'Purpose', 'Have Vehicle',
            'Vehicle Number', 'Is With Team', 'Number of Team', 'Visiting From', 'Is Approved', 'Visited At',
            'Departed At', 'Type of ID', 'ID Number', 'Remarks'
        ])

        for visit in visit_histories:
            writer.writerow([
                visit.organization.full_name if visit.organization else '',
                visit.visitor.full_name if visit.visitor else '',
                visit.full_name,
                visit.email,
                visit.mobile_number,
                visit.purpose,
                "Yes" if visit.have_vehicle else "No",
                visit.vehicle_number,
                "Yes" if visit.is_with_team else "No",
                visit.number_of_team,
                visit.visiting_from,
                visit.is_approved,
                visit.visited_at,
                visit.departed_at,
                visit.type_of_id,
                visit.id_number,
                visit.remarks
            ])

        return response


class DeleteVisitorHistoryView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        visit_history = OrganizationVisitHistory.objects.filter(
            pk=self.kwargs['visitor_history_id'],
        ).first()
        if not visit_history:
            raise ValidationError(
                {
                    "error": "Visitor  does not exist for given id or given id is not of organization."
                }
            )
        return visit_history

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {
                "success": "visitor deleted successfully"
            },
            status=status.HTTP_204_NO_CONTENT)


class OrganizationHistoryVisitorCountView(generics.ListAPIView):
    serializer_class = VisitorCountsSerializer

    def get_object(self):
        organization = CustomUser.objects.filter(pk=self.kwargs.get('organization_id')).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization Doesnot exists for given id.'
                }
            )
        return organization

    def get_queryset(self):
        # Count of entries based on visitor type
        visitor_counts = OrganizationVisitHistory.objects.filter(
            organization=self.get_object()
        ).values('visit_type').annotate(
            count=Count('visit_type')
        ).order_by('visit_type')

        # Extract counts for Manual and Scan types
        manual_count = visitor_counts.filter(visit_type='Manual').first()['count'] if visitor_counts.filter(
            visit_type='Manual').exists() else 0
        scan_count = visitor_counts.filter(visit_type='Scan').first()['count'] if visitor_counts.filter(
            visit_type='Scan').exists() else 0

        return [{'visit_type': 'Manual', 'count': manual_count}, {'visit_type': 'Scan', 'count': scan_count}]


class DownloadBranchPdfView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        # Retrieve path parameters from kwargs
        branch_id = kwargs.get('branch_id')
        branch = OrganizationBranch.objects.filter(pk=branch_id).first()
        if not branch:
            raise ValidationError(
                {
                    'error': "Branch dosenot exist for given id"
                }
            )
        template = get_template('branch_pdf.html')
        html = template.render({'branch': branch})

        pdf_response = HttpResponse(content_type='application/pdf')
        pdf_response['Content-Disposition'] = 'attachment; filename="branch.pdf"'

        # Generate PDF from HTML content
        pisa.CreatePDF(html, dest=pdf_response)

        return pdf_response


class DownloadVisitHistoryPdfView(generics.RetrieveAPIView):
    serializer_class = VisitorDataForPdfSerializer

    def get_object(self):
        visitor_history = OrganizationVisitHistory.objects.filter(
            pk=self.kwargs['visitor_history_id']
        ).first()
        if not visitor_history:
            raise ValidationError({"error": "Visitor History found for given id. "})
        return visitor_history

    def get(self, request, *args, **kwargs):
        # Retrieve path parameters from kwargs

        serializer = self.get_serializer(self.get_object())

        context = {
            'visitor_history': serializer.data
        }
        print(context)

        template = get_template('visitor_history_details.html')

        html_content = template.render(context)

        # Create PDF from the HTML content
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="visitor_history_details.pdf"'

        pisa.CreatePDF(html_content, dest=response)
        return response


class ListWaitingVisitorsView(generics.ListAPIView):
    serializer_class = VisitorDataSerializer
    filterset_class = OrganizationVisitHistoryFilter

    def get_object(self):
        organization = CustomUser.objects.filter(
            pk=self.kwargs.get('organization_id'),
            is_visitor=False,
            is_organization=True
        ).first()
        if not organization:
            raise ValidationError(
                {
                    'error': 'Organization Does not exist for given id.'
                }
            )
        return organization

    def get_queryset(self):
        return OrganizationVisitHistory.objects.filter(
            organization=self.get_object(),
            is_approved=False
        )
