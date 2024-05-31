from common.usecases import BaseUseCase
from notification.models import NotificationData
import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from user.models import CustomUser
from django.core.mail import send_mail, EmailMessage
from rest_framework.response import Response
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import requests
from django.conf import settings


def send_sms(to, text):
    try:
        response = requests.post(
            settings.SMS_SEND_API_URL,
            data={
                "auth_token": settings.SMS_API_TOKEN,
                "to": to,
                "text": text,
            },
        )
        response.raise_for_status()
        response_json = response.json()
        if response_json.get("status") == "success":
            Response(f"SMS Sent Successfully to {to}")
            return response.status_code, response.text, response_json
        else:
            Response(f"Failed to send SMS to {to}: {response_json}")
            return response.status_code, response.text, response_json
    except requests.exceptions.RequestException as e:
        Response(f"HTTP Request error: {e}")
        return None, None, None
    except Exception as e:
        Response(f"Error sending SMS: {str(e)}")
        return None, None, None


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
                    Response({"message": f"Notification Sent Successfully to {fcm_token}"})
                else:
                    Response({"message": "Failed to send notification."})
            except Exception as e:
                Response({"Error": f"Error sending notification to {fcm_token}: {str(e)}"})

    def _send_email_notifications(self, emails):
        for email in emails:
            try:
                attach_file = self._data.get("attach_file")
                if attach_file:
                    if hasattr(attach_file, "path"):
                        file_path = attach_file.path
                    else:
                        file_path = default_storage.save(
                            "media/attachments/" + attach_file.name,
                            ContentFile(attach_file.read()),
                        )

                    with open(file_path, "rb") as f:
                        image_data = f.read()

                    msg = EmailMessage(
                        self._data["title"],
                        self._data["message"],
                        "noreply.epassnepal@gmail.com",
                        [email],
                    )
                    msg.content_subtype = "html"
                    msg.attach(attach_file.name, image_data, "image/jpeg")

                    msg.send()

                    if not hasattr(attach_file, "path"):
                        default_storage.delete(file_path)
                else:
                    html_message = f"""
                        <html>
                        <body>
                            <h1>{self._data["title"]}</h1>
                            <p>{self._data["message"]}</p>
                        </body>
                        </html>
                    """
                    send_mail(
                        self._data["title"],
                        self._data["message"],
                        "noreply.epassnepal@gmail.com",
                        [email],
                        fail_silently=False,
                        html_message=html_message,
                    )

                Response({"message": f"Email Sent Successfully to {email}"})
            except Exception as e:
                Response({"Error": f"Error sending email to {email}: {str(e)}"})

    def _send_sms_notifications(self, mobile_numbers):
        for number in mobile_numbers:
            try:
                text = f"{self._data['title']}: {self._data['message']}"
                status_code, response, response_json = send_sms(number, text)
                if status_code == 200 and response_json.get("status") == "success":
                    Response({"message": f"SMS Sent Successfully to {number}"})
                else:
                    Response({"message": f"Failed to send SMS to {number}: {response}"})
            except Exception as e:
                Response({"Error": f"Error sending SMS to {number}: {str(e)}"})

    def _factory(self):
        user_id = self._data.get("user_id")
        user_instance = CustomUser.objects.get(id=user_id) if user_id else None

        notification = NotificationData.objects.create(
            organization_id=self.instance,
            user_id=user_instance,
            notification_type=self._data.get("notification_type"),
            audience=self._data.get("audience"),
            title=self._data.get("title"),
            message=self._data.get("message"),
            attach_file=self._data.get("attach_file"),
        )

        if user_instance:
            devices = (
                OrganizationFCMToken.objects.filter(organization=user_instance)
                .exclude(fcm_token__isnull=True)
                .exclude(fcm_token__exact="")
            )
            emails = [user_instance.email]
            mobile_numbers = [user_instance.mobile_number]
            self._send_fcm_notifications(devices)
            self._send_email_notifications(emails)
            self._send_sms_notifications(mobile_numbers)

            return notification

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
            mobile_numbers = users.values_list("mobile_number", flat=True)

            self._send_fcm_notifications(devices)
            self._send_email_notifications(emails)
            self._send_sms_notifications(mobile_numbers)

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
        mobile_numbers = users.values_list("mobile_number", flat=True)

        self._send_fcm_notifications(devices)
        self._send_email_notifications(emails)
        self._send_sms_notifications(mobile_numbers)

        return notification
