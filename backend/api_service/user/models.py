import re
import uuid
from io import BytesIO

import qrcode
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _

from common.models import BaseModel

ORGANIZATION_TYPES = [
    ("private", "Private"),
    ("non-government", "Non-Government"),
    ("government", "Government"),
    ("public", "Public"),
    ("educational", "Educational"),
    ("healthcare", "Healthcare"),
    ("research", "Research"),
    ("non-profit", "Non-Profit"),
    ("technology", "Technology"),
    ("financial", "Financial"),
    ("entertainment", "Entertainment"),
    ("retail", "Retail"),
    ("hospitality", "Hospitality"),
    ("agriculture", "Agriculture"),
    ("manufacturing", "Manufacturing"),
    ("environmental", "Environmental"),
    ("arts-and-culture", "Arts and Culture"),
    ("social-services", "Social Services"),
    ("sports", "Sports"),
    ("media", "Media"),
    ("religious", "Religious"),
    ("other", "Other"),
]

ORGANIZATION_NATURE_TYPES = [
    ("service-based", "Service Based"),
    ("product-based", "Product Based"),
    ("non-profit", "Non Profit"),
    ("educational", "Educational"),
    ("healthcare", "Healthcare"),
    ("research", "Research"),
    ("technology", "Technology"),
    ("financial", "Financial"),
    ("entertainment", "Entertainment"),
    ("retail", "Retail"),
    ("hospitality", "Hospitality"),
    ("agriculture", "Agriculture"),
    ("manufacturing", "Manufacturing"),
    ("environmental", "Environmental"),
    ("arts-and-culture", "Arts and Culture"),
    ("social-services", "Social Services"),
    ("sports", "Sports"),
    ("media", "Media"),
    ("religious", "Religious"),
    ("other", "Other"),
]

# def validate_mobile_number(mobile_number):
#     mobile_number_regex = "^(984|986|980|981|985|988|974|976)\\d{7}$"
#     if not re.match(mobile_number_regex, mobile_number):
#         raise ValueError("Invalid Nepali mobile number")
from rest_framework import serializers


def validate_mobile_number(mobile_number):
    mobile_number_regex = "^(984|986|980|981|985|988|974|976)\\d{7}$"
    if not re.match(mobile_number_regex, mobile_number):
        raise serializers.ValidationError("Invalid Nepali mobile number")


class CustomUserManager(BaseUserManager):
    def create_user(
            self,
            mobile_number,
            full_name=None,
            email=None,
            password=None,
            organization_type=None,
            **extra_fields,
    ):
        if not mobile_number:
            raise ValidationError("The Mobile Number field must be set")
        email = self.normalize_email(email)
        is_organization = organization_type is not None
        user = self.model(
            mobile_number=mobile_number,
            full_name=full_name,
            email=email,
            organization_type=organization_type,
            **extra_fields,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_organization(
            self,
            mobile_number,
            full_name,
            email,
            password=None,
            organization_type=None,
            organization_name=None,
            **extra_fields,
    ):
        mobile_number_regex = "^(984|986|980|981|985|988|974|987|976)\\d{7}$"

        if not re.match(mobile_number_regex, mobile_number):
            raise ValidationError("Invalid Nepali mobile number")

        if not organization_name or not organization_type:
            raise ValidationError("Organization name and type are required")

        email = self.normalize_email(email)

        user = self.model(
            mobile_number=mobile_number,
            full_name=full_name,
            email=email,
            password=password,
            organization_name=organization_name,
            organization_type=organization_type,
            is_organization=True,
            **extra_fields,
        )

        user.set_password(password)

        user.save(using=self._db)

        return user

    def create_superuser(self, mobile_number, email, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("is_sms_verified", True)
        extra_fields.setdefault("is_kyc_verified", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("full_name", "Admin User")

        if extra_fields.get("is_admin") is not True:
            raise ValueError("Superuser must have is_admin=True.")

        user = self.create_user(
            mobile_number, email=email, password=password, **extra_fields
        )

        return user


import uuid


class Subscription(models.Model):
    user = models.OneToOneField('CustomUser', unique=True, on_delete=models.CASCADE, related_name='org_subscription',
                                null=True, blank=True)
    subscription_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    start_subscription = models.DateTimeField(null=True, blank=True)
    end_subscription = models.DateTimeField(null=True, blank=True)
    lock_org = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user.organization_name)

    class meta:
        verbose_name = "Subscription"
        verbose_name_plural = "Subscriptions"


class CustomUser(AbstractBaseUser, PermissionsMixin):
    mobile_number = models.CharField(max_length=10, unique=True, validators=[validate_mobile_number])
    full_name = models.CharField(max_length=300, blank=True, null=True)

    subscription = models.ForeignKey(Subscription, null=True, blank=True, on_delete=models.SET_NULL)

    email = models.EmailField(max_length=300, blank=True, null=True)

    otp = models.PositiveIntegerField(null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=False)
    is_sms_verified = models.BooleanField(default=False)

    approve_visitors = models.BooleanField(default=False)

    is_organization = models.BooleanField(default=False)

    admin_of_organization = models.BooleanField(default=False)
    validation_token_of_organization = models.UUIDField(default=uuid.uuid4, editable=False)

    address = models.TextField(max_length=200, blank=True, null=True)

    is_kyc_verified = models.BooleanField(default=False)
    organization_name = models.CharField(max_length=250, blank=True, null=True)
    organization_type = models.CharField(max_length=20, choices=ORGANIZATION_TYPES, blank=True, null=True, )
    organization_nature = models.CharField(max_length=20, choices=ORGANIZATION_NATURE_TYPES, blank=True, null=True, )
    profile_picture = models.ImageField(upload_to="qr/%Y/", blank=True, null=True)
    qr = models.ImageField(upload_to="qr/%Y/", blank=True, null=True)
    is_admin = models.BooleanField(default=False)
    is_visitor = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_manual_user = models.BooleanField(default=False)
    approve_visitor_before_access = models.BooleanField(default=False)
    check_in_check_out_feature = models.BooleanField(default=False)

    objects = CustomUserManager()
    USERNAME_FIELD = "mobile_number"
    REQUIRED_FIELDS = ["email"]

    def __str__(self):
        return str(self.mobile_number)
        #  + " | " + str(self.organization_name) + " | " + str(self.email) 

    def get_absolute_url(self):
        return f"/user/{self.id}/"

    @property
    def organization_status(self):
        return self.organizationkyc.status

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


@receiver(post_save, sender=CustomUser)
def create_qr_code_for_organization(sender, instance, created, **kwargs):
    if created:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(instance.pk)
        qr.make(fit=True)
        img = BytesIO()
        qr.make_image(fill="black", back_color="white").save(img)
        instance.qr.save(f"{instance.mobile_number}-qrcode.png", img, save=True)


class FCMDevices(BaseModel):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    registration_id = models.CharField(max_length=1000)

    def __str__(self):
        return str(self.user.mobile_number)

    def clean(self):
        if not self.user.is_visitor:
            raise ValidationError(
                {
                    'error': 'Error users need to be  visitor'
                }
            )


