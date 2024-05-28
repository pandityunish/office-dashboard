from common.usecases import BaseUseCase
from notification.models import NotificationData
import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from django.core.mail import send_mail
from rest_framework.response import Response


class CreateNotificationUseCase(BaseUseCase):
    def __init__(self, instance, serializer, data):
        self.instance = instance
        self.serializer = serializer
        super().__init__(serializer)
        self._data = data

    def _send_notifications(self, devices):
        for device in devices:
            fcm_token = device.fcm_token
            message = messaging.Message(
                notification=messaging.Notification(
                    title=self._data["title"], body=self._data["message"]
                ),
                token=fcm_token,
            )

            try:
                response = messaging.send(message)
                if response:
                    Response(
                        {"message": f"Notification Sent Successfully to {fcm_token}"}
                    )
                else:
                    Response({"message": "Failed to send notification."})
            except Exception as e:
                Response(
                    {"Error": f"Error sending notification to {fcm_token}: {str(e)}"}
                )

    def _factory(self):
        notification = NotificationData.objects.create(
            organization_id=self.instance,
            notification_type=self._data.get("notification_type"),
            audience=self._data.get("audience"),
            title=self._data.get("title"),
            message=self._data.get("message"),
        )

        audience = self._data.get("audience")
        creator_id = self.instance.id if self.instance else None

        if audience == "branch":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_branch=True, organization__creator_id=creator_id
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
        elif audience == "organization":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_organization=True,
                    organization__creator_id=creator_id,
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
        elif audience == "staff":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_staff=True,
                    organization__is_admin=False,
                    organization__creator_id=creator_id,
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
        elif audience == "visitor":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_visitor=True, organization__creator_id=creator_id
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
        else:
            devices = OrganizationFCMToken.objects.exclude(
                fcm_token__isnull=True,
            ).exclude(fcm_token__exact="")

        self._send_notifications(devices)

        return notification
