from django.urls import path
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import StaffUser
from .serializers import StaffUserSerializer, GetStaffUserSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view, permission_classes


class StaffUserViewSet(viewsets.ModelViewSet):
    queryset = StaffUser.objects.all()
    serializer_class = StaffUserSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['organization'] = request.user.id
        raw_password = request.data.get('password', None)
        hashed_password = make_password(raw_password)
        request.data['password'] = hashed_password
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def list(self, request, *args, **kwargs):
        query_data = StaffUser.objects.filter(organization=request.user.id)
        serializer = GetStaffUserSerializer(query_data, many=True)
        return Response(serializer.data)


from user.models import CustomUser
import jwt
from datetime import datetime
from api_service.settings import SECRET_KEY


class StaffUserUpdateView(APIView):
    permission_classes([IsAuthenticated])

    def post(self, request, pk=None):
        try:
            instance = StaffUser.objects.get(id=pk)
            '''via staff'''
            authorization_header = request.META.get('HTTP_AUTHORIZATION', '')
            if authorization_header.startswith('Bearer '):
                token = authorization_header.split('Bearer ')[1].strip()
                # Decode the token
                decoded_token = jwt.decode(token, key=SECRET_KEY, algorithms=['HS256'])
                # Extract information
                token_type = decoded_token.get('token_type')
                exp = decoded_token.get('exp')
                iat = decoded_token.get('iat')
                jti = decoded_token.get('jti')
                user_id = decoded_token.get('user_id')
                email = decoded_token.get('payload', {}).get('email')
                # Check expiration time
                current_time = datetime.utcnow().timestamp()
                if exp < current_time:
                    return Response({"message": "Token Expired"}, status=400)
                else:
                    if instance.organization.id == instance.organization.id:
                        instance_of_staff = StaffUser.objects.get(id=pk)
                        raw_password = request.data.get('password', None)
                        if raw_password:
                            hashed_password = make_password(raw_password)
                            request.data['password'] = hashed_password
                        serializer = StaffUserSerializer(instance_of_staff, data=request.data, partial=True)
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                        return Response(serializer.data)
                    else:
                        return Response({"message": "You are not authorized"}, status=400)
            else:
                return Response({"message": "You are not authorized"}, status=400)
        except Exception as e:
            return Response({"message": str(e)}, status=400)


class StaffUserLoginView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get("email", None)
            password = request.data.get("password", None)

            if email is None or password is None:
                raise serializers.ValidationError('Both email and password are required to log in.')

            user = StaffUser.objects.filter(email=email).first()

            if user is None or not check_password(password, user.password):
                raise serializers.ValidationError('Invalid email or password.')

            if not user.is_active:
                raise serializers.ValidationError('This user account is not active.')

            data = {}

            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            # Include additional information in the token payload (email in this case)
            access_token_payload = {
                'token_type': 'access',
                'exp': int(access_token['exp']),
                'jti': access_token['jti'],
                'user_id': user.id,
                'email': user.email,  # Add email to the payload
            }

            # Replace the existing access token with the one containing the email
            access_token['payload'] = access_token_payload

            data['access_token'] = str(access_token)
            data['refresh_token'] = str(refresh)

            return Response(data, status=status.HTTP_200_OK)
        except:
            return Response({"message": "credential is wrong"}, status=400)

# class StaffUserLoginView(APIView):
#     def post(self, request, *args, **kwargs):
#         email=request.data.get("email",None)
#         password=request.data.get("password",None)
#         if email is None or password is None:
#             raise serializers.ValidationError('Both email and password are required to log in.')

#         user = StaffUser.objects.filter(email=email).first()

#         if user is None or not check_password(password, user.password):
#             raise serializers.ValidationError('Invalid email or password.')

#         if not user.is_active:
#             raise serializers.ValidationError('This user account is not active.')

#         data = {}
#         refresh = RefreshToken.for_user(user)
#         access_token = refresh.access_token

#         data['access_token'] = str(access_token)
#         data['refresh_token'] = str(refresh)

#         return Response(data, status=status.HTTP_200_OK)
