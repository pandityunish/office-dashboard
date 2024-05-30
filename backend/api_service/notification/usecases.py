from common.usecases import BaseUseCase
from notification.models import NotificationData
import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from user.models import CustomUser
from django.core.mail import send_mail
from rest_framework.response import Response
from django.core.mail import EmailMessage

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
                attach_file = self._data.get("attach_file")
                if attach_file:
                    image_filename = attach_file.name

                    with open(attach_file.path, 'rb') as image_file:
                        image_data = image_file.read()
                    
                    msg = EmailMessage(
                        self._data["title"],
                        self._data["message"],
                        "noreply.epassnepal@gmail.com",
                        [email],
                    )
                    msg.content_subtype = "html"
                    msg.attach(image_filename, image_data, 'image/jpeg')
                    
                    msg.send()
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
                        html_message=html_message
                    )
                
                Response({"message": f"Email Sent Successfully to {email}"})
            except Exception as e:
                Response({"Error": f"Error sending email to {email}: {str(e)}"})


    def _factory(self):
        user_id = self._data.get('user_id')
        user_instance = CustomUser.objects.get(id=user_id) if user_id else None

        notification = NotificationData.objects.create(
            organization_id=self.instance,
            user_id=user_instance,
            notification_type=self._data.get("notification_type"),
            audience=self._data.get("audience"),
            title=self._data.get("title"),
            message=self._data.get("message"),
            attach_file=self._data.get("attach_file")
        )

        if user_instance:
            devices = OrganizationFCMToken.objects.filter(organization=user_instance).exclude(fcm_token__isnull=True).exclude(fcm_token__exact="")
            emails = [user_instance.email]
            self._send_fcm_notifications(devices)
            self._send_email_notifications(emails)
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
