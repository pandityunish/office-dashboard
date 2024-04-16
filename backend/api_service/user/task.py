from celery import shared_task
from django.core.mail import send_mail
from .utils import send_otp_to_user


@shared_task
def send_sms_notification(mobile_number, message):
    send_otp_to_user(mobile_number, message)


@shared_task
def send_email_notification(subject, message, from_email, recipient_list):
    send_mail(subject, message, from_email, recipient_list)
