import re
import uuid
from io import BytesIO
import qrcode

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from common.choices import StatusChoices

from common.models import BaseModel

from common.utils import validate_file_size

User = get_user_model()


def validate_mobile_number(mobile_number):
    mobile_number_regex = "^(984|986|980|981|985|988|974|976)\\d{7}$"
    if not re.match(mobile_number_regex, mobile_number):
        raise ValueError("Invalid Nepali mobile number")


class OrganizationKYCSocialMediaLink(BaseModel):
    name = models.CharField(max_length=100)
    link = models.URLField()

    def __str__(self):
        return self.name


class OrganizationKYCDocument(BaseModel):
    name = models.CharField(max_length=100)
    file = models.FileField(
        upload_to="organization_kyc/documents/%Y/%m/%d/",
        validators=[
            validate_file_size
        ]
    )

    def __str__(self):
        return self.name


class OrganizationKYC(BaseModel):
    organization = models.OneToOneField(User, unique=True, on_delete=models.SET_NULL, null=True, blank=True)
    establishment_year = models.PositiveIntegerField(blank=True, null=True)
    vat_number = models.CharField(max_length=50, blank=True, null=True)
    pan_number = models.CharField(max_length=50, blank=True, null=True)
    registration_number = models.CharField(max_length=50, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    district = models.CharField(max_length=100, blank=True, null=True)
    municipality = models.CharField(max_length=100, blank=True, null=True)
    city_village_area = models.CharField(max_length=100, blank=True, null=True)
    ward_no = models.IntegerField(null=True, blank=True)
    contact_person_full_name = models.CharField(max_length=20, null=True, blank=True)
    organization_summary = models.TextField(null=True, blank=True)
    whatsapp_viber_number = models.CharField(max_length=20, null=True, blank=True)
    secondary_number = models.CharField(max_length=20, blank=True, null=True)
    telephone_number = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    logo = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    registration_certificate = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    PAN_VAT_certificate = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    licenses = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    citizenship = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    passport = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    driving_license = models.ImageField(upload_to="logo/%Y/%m/%d/", blank=True, null=True)
    social_media_links = models.ManyToManyField(to=OrganizationKYCSocialMediaLink)
    documents = models.ManyToManyField(to=OrganizationKYCDocument)

    status = models.CharField(
        choices=StatusChoices.choices,
        max_length=20,
        default=StatusChoices.PENDING
    )

    def __str__(self):
        return str(self.registration_number)

    def get_absolute_url(self):
        return f"/organization/{self.id}/"

    class Meta:
        verbose_name = "Organization KYC"
        verbose_name_plural = "Organization KYC"


class CreatedAtMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        abstract = True


TYPE_OF_ID = [
    ("License", "License"),
    ("Passport", "Passport"),
    ("Citizenship", "Citizenship"),
]


class OrganizationVisitHistory(BaseModel):
    MANUAL = 'Manual'
    SCAN = 'Scan'

    VISIT_CHOICES = [
        (MANUAL, 'Manual'),
        (SCAN, 'Scan'),
    ]
    organization = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True,
                                     related_name="visiting_organization")
    visitor = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="visited_by", null=True, blank=True)
    full_name = models.CharField(max_length=50)
    email = models.EmailField(max_length=300, blank=True, null=True)
    mobile_number = models.CharField(max_length=50, blank=True, null=True)
    purpose = models.CharField(max_length=250)
    have_vehicle = models.BooleanField(blank=True, null=True, default=False)
    vehicle_number = models.CharField(max_length=50, blank=True, null=True)
    is_with_team = models.BooleanField(blank=True, null=True, default=False)
    number_of_team = models.IntegerField(blank=True, null=True, default=0)
    visiting_from = models.CharField(max_length=250, null=True, blank=True)
    is_approved = models.BooleanField(default=False, blank=True, null=True)
    visited_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    departed_at = models.DateTimeField(null=True, blank=True)
    photo = models.ImageField(upload_to="visitors/%Y/%m/%d/", blank=True, null=True)
    qr = models.ImageField(upload_to="qr/%Y/", blank=True, null=True)
    type_of_id = models.CharField(max_length=20, choices=TYPE_OF_ID, blank=True, null=True, )
    id_number = models.CharField(max_length=20, blank=True, null=True, )
    visit_type = models.CharField(
        max_length=10,
        choices=VISIT_CHOICES,
        null=True
    )

    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Visit to {self.organization} by {self.visitor}"

    class Meta:
        verbose_name = "Visitor"
        verbose_name_plural = "Visitors"

    def clean(self):
        if not self.organization.is_organization:
            raise ValidationError(
                {
                    'organization': 'organization is not an organization i.e is_organization is not set to true.'
                }
            )
        if not self.visitor.is_visitor:
            raise ValidationError(
                {
                    'visitor': 'visitor is not visitor i.e is_visitor is not set to true.'
                }
            )


@receiver(post_save, sender=OrganizationVisitHistory)
def create_qr_code_for_visitor(sender, instance, created, **kwargs):
    if created:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(instance.id)
        qr.make(fit=True)
        img = BytesIO()
        qr.make_image(fill="black", back_color="white").save(img)
        instance.qr.save(f"{instance.mobile_number}-qrcode.png", img, save=True)


class OrganizationBranch(BaseModel):
    organization = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)

    email = models.EmailField(max_length=200, null=True, blank=True)

    branch_no = models.CharField(max_length=10, null=True, blank=True)

    contact_person = models.CharField(max_length=200, null=True, blank=True)

    mobile_no = models.CharField(max_length=200, null=True, blank=True)

    country = models.CharField(max_length=100, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    district = models.CharField(max_length=100, null=True, blank=True)
    municipality = models.CharField(max_length=100, null=True, blank=True)

    city_village_area = models.CharField(max_length=100, null=True, blank=True)
    ward_no = models.CharField(max_length=10, null=True, blank=True)

    employee_size = models.CharField(max_length=20, null=True, blank=True)
    qr_image = models.ImageField(
        upload_to="branch_qr/%Y/",
        blank=True,
        null=True
    )
    LOCK_BRANCH_CHOICES = [
        ("Active", 'Active'),
        ("Inactive", 'Inactive'),
    ]

    lock_branch = models.CharField(
        max_length=10,
        choices=LOCK_BRANCH_CHOICES,
        default="Active",
    )

    def __str__(self):
        return f"{self.organization} - {self.name}"

    class Meta:
        verbose_name = "Branch"
        verbose_name_plural = "Branches"
        unique_together = ("organization", "branch_no")


@receiver(post_save, sender=OrganizationBranch)
def create_qr_code_for_organization_branch(sender, instance, created, **kwargs):
    if created:
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(instance.id)
        qr.make(fit=True)
        img = BytesIO()
        qr.make_image(fill="black", back_color="white").save(img)
        instance.qr_image.save(f"{instance.mobile_no}-qrcode.png", img, save=True)


class OrganizationSocialMediaLink(models.Model):
    organization = models.ForeignKey(User, on_delete=models.CASCADE)
    platform = models.CharField(max_length=50)
    link = models.URLField()

    def __str__(self):
        return f"{self.organization} - {self.platform}"

    class Meta:
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"


def upload_to_organization_document(instance, filename):
    extension = filename.split('.')[-1]
    unique_filename = f"{uuid.uuid4()}.{extension}"
    return f"documents/{unique_filename}"


class OrganizationDocument(models.Model):
    organization = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    file = models.FileField(upload_to=upload_to_organization_document)

    def __str__(self):
        return f"{self.organization} - {self.name}"

    class Meta:
        verbose_name = "Document"
        verbose_name_plural = "Documents"


class Device(models.Model):
    DEVICE_TYPES = (
        ('android', 'Android'),
        ('computer', 'Computer'),
        ('other', 'Other'),
    )

    name_of_device = models.CharField(max_length=255, null=True, blank=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_TYPES, default='other', null=True, blank=True)
    organization = models.ForeignKey(User, related_name='device_org', on_delete=models.CASCADE, null=True, blank=True)
    ip_address = models.CharField(max_length=20, null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    update_at = models.DateTimeField(auto_now=True, null=True, blank=True)

    def __str__(self):
        return self.name_of_device


class Purpose(models.Model):
    text_field = models.TextField()

    def __str__(self):
        return self.text_field


from ckeditor.fields import RichTextField
from user.models import CustomUser


class OrganizationContent(models.Model):
    organization = models.ForeignKey(CustomUser, unique=True, on_delete=models.CASCADE)
    about_us = RichTextField(blank=True, null=True)
    privacy_policy = RichTextField(blank=True, null=True)
    terms_and_conditions = RichTextField(blank=True, null=True)
    faqs = RichTextField(blank=True, null=True)

    class Meta:
        verbose_name = "Org Content"
        verbose_name_plural = "Org Contents"


class AdsBanner(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='ads_banners/')
    link_url = models.URLField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




class Guest(models.Model):
    full_name = models.CharField(max_length=100)
    mobile_number = models.CharField(max_length=10)
    email = models.EmailField()
    numAdultguest = models.IntegerField(blank=True,null=True)
    numChildguest = models.IntegerField(blank=True,null=True)
    numofroom = models.IntegerField(blank=True,null=True)
    type_of_id = models.CharField(max_length=200,blank=True,null=True)
    id_number = models.IntegerField(blank=True,null=True)
    advancedPayment = models.IntegerField(blank=True,null=True)
    remainingPayment = models.IntegerField(blank=True,null=True) 
    checkout_date = models.DateField(blank=True,null=True)
    paymentmethod = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.full_name

      

