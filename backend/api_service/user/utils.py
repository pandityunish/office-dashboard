import re

import requests
import secrets
import os
import os

from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from dotenv import load_dotenv

load_dotenv()


def generate_otp():
    return str(secrets.randbelow(900000) + 100000)


def send_otp_to_user(to, text):
    try:
        r = requests.post(
            settings.SMS_SEND_API_URL,
            data={
                "auth_token": settings.SMS_API_TOKEN,
                "to": to,
                "text": text,
            },
        )
        status_code = r.status_code
        response = r.text
        response_json = r.json()
        return status_code, response, response_json
    except:
        return False


def generate_sms_text(otp):
    return (
        f"Welcome to Epass! Thank you for registering. "
        f"Your verification code is: {otp}. "
        f"This code is valid for the next 10 minutes. "
        f"Enjoy using Epass!"
    )


def send_email(message, subject, recipient_list):
    from_email = 'noreply.epassnepal@gmail.com'

    send_mail(subject, message, from_email, [recipient_list])


def validate_mobile_number(mobile_number):
    mobile_number_regex = "^(984|986|980|981|985|988|974|976)\\d{7}$"
    if not re.match(mobile_number_regex, mobile_number):
        raise ValidationError({'mobile_number': "Invalid Nepali mobile number"})
