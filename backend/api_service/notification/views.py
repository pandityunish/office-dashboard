from django.contrib.auth import get_user_model
from rest_framework import status, generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication

from . import usecases
from .filterset import NotificationDataFilter
from .models import Notification
from .serializers import NotificationSerializer, OrganizationNotificationCountSerializer, RegisterUserDeviceSerializer
from user.models import CustomUser

from common.permissions import IsOrganizationUser

from common.permissions import IsVisitingUser
from organization.models import Device

User = get_user_model()


class NotificationList(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            if request.user.is_authenticated:
                user = request.user
                notifications = Notification.objects.filter(user=user).order_by(
                    "-timestamp"
                )
                serializer = NotificationSerializer(notifications, many=True)
                return Response(serializer.data)
            else:
                return Response(
                    {"message": "User is not authenticated."},
                    status=status.HTTP_UNAUTHORIZED,
                )
        except User.DoesNotExist:
            return Response(
                {"message": "User does not exist."}, status=status.HTTP_NOT_FOUND
            )


class UserNotificationList(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        notifications = Notification.objects.filter(organization=user)
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)


class OrganizationNotificationList(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOrganizationUser]
    serializer_class = NotificationSerializer
    filterset_class = NotificationDataFilter

    def get_object(self):
        organization_id = self.kwargs.get("organization_id")
        user = CustomUser.objects.filter(pk=organization_id).first()
        if not user:
            raise ValidationError({"error": "Organization not found."})
        return user

    def get_queryset(self):
        return NotificationData.objects.filter(organization_id=self.get_object())


from rest_framework import viewsets
from .models import NotificationData
from .serializers import NotificationDataSerializer


class NotificationDataViewSet(viewsets.ModelViewSet):
    queryset = NotificationData.objects.all()
    serializer_class = NotificationDataSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user_id'] = request.user.id
        serializer = NotificationDataSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class CreateNotificationView(generics.CreateAPIView):
    serializer_class = NotificationDataSerializer

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
        return usecases.CreateNotificationUseCase(
            instance=self.get_object(),
            serializer=serializer
        ).execute()


class NotificationDetailAPIView(generics.RetrieveAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer

    def get_object(self):
        notification_id = self.kwargs.get("notification_id")
        notification = NotificationData.objects.filter(pk=notification_id).first()
        if not notification:
            raise ValidationError({"error": "Notification not found."})
        notification.is_seen = True
        notification.save()
        return notification


class OrganizationNotificationNotificationCountView(generics.ListAPIView):
    serializer_class = OrganizationNotificationCountSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        organization_id = self.kwargs.get("organization_id")
        notification = CustomUser.objects.filter(pk=organization_id).first()
        if not notification:
            raise ValidationError({"error": "Organization not found."})
        return notification

    def get_queryset(self):
        organization = self.get_object()
        user = self.request.user
        queryset = NotificationData.objects.filter(
            organization_id=organization.id,
            user_id=user.id,
            is_seen=False
        )
        return queryset


class RegisterUserDeviceView(generics.CreateAPIView):
    serializer_class = RegisterUserDeviceSerializer
    permission_classes = [IsVisitingUser]

    """
    registration id -> if exists delete whole device  and create new device
    """

    def perform_create(self, serializer):
        data = serializer.validated_data
        user = User.objects.filter(pk=self.request.user.id).first()
        if user:
            device = Device.objects.filter(
                registration_id=data.get('token'),
            ).first()
            if device:
                device.delete()
            else:
                Device.objects.create(user=user, registration_id=data.get('token'))
        else:
            raise ValidationError({
                'error': 'error user doesnot exist.'
            })

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            "device registered  successfully",
            status=status.HTTP_200_OK,
            headers=headers
        )
