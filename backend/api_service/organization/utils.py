import firebase_admin.messaging as messaging
from organization.models import OrganizationFCMToken
from notification.models import NotificationData
from user.models import CustomUser
from django.core.mail import send_mail
from rest_framework.response import Response
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

        try:
            recipient_mobile = user.mobile_number
            text = f"{notification_data['title']}: {notification_data['message']}"
            status_code, response, response_json = send_sms(recipient_mobile, text)
            if status_code == 200 and response_json.get("status") == "success":
                Response({"message": f"SMS Sent Successfully to {recipient_mobile}"})
            else:
                Response(
                    {"message": f"Failed to send SMS to {recipient_mobile}: {response}"}
                )
        except Exception as e:
            Response({"Error": f"Error sending SMS to {recipient_mobile}: {str(e)}"})
