from common.usecases import BaseUseCase
from notification.models import NotificationData
import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from user.models import CustomUser
from django.core.mail import send_mail
from rest_framework.response import Response


class CreateNotificationUseCase(BaseUseCase):
    def __init__(self, instance, serializer, data):
        self.instance = instance
        self.serializer = serializer
        super().__init__(serializer)
        self._data = data

    def _send_fcm_notifications(self, devices):
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

    def _send_email_notifications(self, emails):
        for email in emails:
            try:
                send_mail(
                    self._data["title"],
                    self._data["message"],
                    "noreply.epassnepal@gmail.com",
                    [email],
                    fail_silently=False,
                )
                Response({"message": f"Email Sent Successfully to {email}"})
            except Exception as e:
                Response({"Error": f"Error sending email to {email}: {str(e)}"})

    def _factory(self):
        notification = NotificationData.objects.create(
            organization_id=self.instance,
            notification_type=self._data.get("notification_type"),
            audience=self._data.get("audience"),
            title=self._data.get("title"),
            message=self._data.get("message"),
        )

        audience = self._data.get("audience")
        is_admin_notification = self.instance is None or self.instance.is_admin

        if is_admin_notification:
            if audience == "branch":
                devices = (
                    OrganizationFCMToken.objects.filter(
                        organization__is_branch=True,
                    )
                    .exclude(fcm_token__isnull=True)
                    .exclude(fcm_token__exact="")
                )
                users = CustomUser.objects.filter(is_branch=True)
            elif audience == "organization":
                devices = (
                    OrganizationFCMToken.objects.filter(
                        organization__is_organization=True,
                    )
                    .exclude(fcm_token__isnull=True)
                    .exclude(fcm_token__exact="")
                )
                users = CustomUser.objects.filter(is_organization=True)
            elif audience == "staff":
                devices = (
                    OrganizationFCMToken.objects.filter(
                        organization__is_staff=True,
                        organization__is_admin=False,
                    )
                    .exclude(fcm_token__isnull=True)
                    .exclude(fcm_token__exact="")
                )
                users = CustomUser.objects.filter(is_staff=True)
            elif audience == "visitor":
                devices = (
                    OrganizationFCMToken.objects.filter(
                        organization__is_visitor=True,
                    )
                    .exclude(fcm_token__isnull=True)
                    .exclude(fcm_token__exact="")
                )
                users = CustomUser.objects.filter(is_visitor=True)
            else:
                devices = OrganizationFCMToken.objects.exclude(
                    fcm_token__isnull=True
                ).exclude(fcm_token__exact="")
                users = CustomUser.objects.all()

            emails = users.values_list("email", flat=True)

            self._send_fcm_notifications(devices)
            self._send_email_notifications(emails)

            return notification

        creator_id = self.instance.id

        if audience == "branch":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_branch=True,
                    organization__creator_id=creator_id,
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
            users = CustomUser.objects.filter(is_branch=True, creator_id=creator_id)
        elif audience == "organization":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_organization=True,
                    organization__creator_id=creator_id,
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
            users = CustomUser.objects.filter(
                is_organization=True, creator_id=creator_id
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
            users = CustomUser.objects.filter(
                is_staff=True, is_admin=False, creator_id=creator_id
            )
        elif audience == "visitor":
            devices = (
                OrganizationFCMToken.objects.filter(
                    organization__is_visitor=True,
                )
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
            users = CustomUser.objects.filter(is_visitor=True)
        else:
            devices = OrganizationFCMToken.objects.exclude(
                fcm_token__isnull=True
            ).exclude(fcm_token__exact="")
            users = CustomUser.objects.all()

        emails = users.values_list("email", flat=True)

        self._send_fcm_notifications(devices)
        self._send_email_notifications(emails)

        return notification
