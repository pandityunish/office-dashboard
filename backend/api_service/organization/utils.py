import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from notification.models import NotificationData
from user.models import CustomUser
from django.core.mail import send_mail
from rest_framework.response import Response

def send_notification(user, notification_data):
    visitor_tokens = (
        OrganizationFCMToken.objects.filter(organization=user)
        .exclude(fcm_token__isnull=True)
        .exclude(fcm_token__exact="")
    )

    for token in visitor_tokens:
        notification_message = messaging.Message(
            notification=messaging.Notification(
                title=notification_data["title"], body=notification_data["message"]
            ),
            token=token.fcm_token,
        )

        organization_instance = CustomUser.objects.get(pk=token.organization_id)
        NotificationData.objects.create(
            organization_id=organization_instance, **notification_data
        )

        try:
            response = messaging.send(notification_message)
            if response:
                Response(
                    {"message": f"Notification Sent Successfully to {token.fcm_token}"}
                )
            else:
                Response({"message": "Failed to send notification."})
        except Exception as e:
            Response(
                {"Error": f"Error sending notification to {token.fcm_token}: {str(e)}"}
            )

        try:
            recipient_email = user.email
            send_mail(
                notification_data["title"],
                notification_data["message"],
                "noreply.epassnepal@gmail.com",
                [recipient_email],
                fail_silently=False,
            )
            Response({"message": f"Email Sent Successfully to {recipient_email}"})
        except Exception as e:
            Response({"Error": f"Error sending email to {recipient_email}: {str(e)}"})
