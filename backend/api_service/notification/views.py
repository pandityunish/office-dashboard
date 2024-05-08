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


from rest_framework.exceptions import PermissionDenied

from django.db.models import Q

class OrganizationNotificationList(generics.ListAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = NotificationSerializer
    filterset_class = NotificationDataFilter

    def get_organization(self, organization_id):
        organization = CustomUser.objects.filter(pk=organization_id).first()
        if not organization:
            raise ValidationError({"error": "Organization not found."})
        return organization

    def get_queryset(self):
        organization_id = self.kwargs.get("organization_id")
        organization = self.get_organization(organization_id)

        is_branch = self.request.user.is_branch
        is_staff = self.request.user.is_staff
        is_visitor = self.request.user.is_visitor
        is_admin = self.request.user.is_admin
        is_organization = self.request.user.is_organization

        filters = Q()
        if is_branch:
            filters |= Q(audience='branch', organization_id=self.request.user.creator_id)
        if is_staff and not is_admin:
            filters |= Q(audience='staff', organization_id=self.request.user.creator_id)
        if is_visitor:
            filters |= Q(audience='visitor')
        if is_organization:
            filters |= Q(audience='organization')

        if not (is_branch or is_staff or is_visitor):
            filters |= Q(audience='organization')

        return NotificationData.objects.filter(filters)





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


class OrganizationNotificationNotificationCountView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self):
        organization_id = self.kwargs.get("organization_id")
        organization = CustomUser.objects.filter(pk=organization_id).first()
        if not organization:
            raise ValidationError({"error": "Organization not found."})
        return organization

    def get(self, request, organization_id):
        organization = self.get_object()
        count = NotificationData.objects.filter(
            organization_id=organization.id, is_seen=False
        ).count()
        return Response({"count": count})


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
