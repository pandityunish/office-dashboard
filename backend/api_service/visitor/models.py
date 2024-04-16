from django.conf import settings
from django.db import models

from common.models import BaseModel
from common.utils import validate_image_size


class VisitorKYC(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    ]

    MARITAL_STATUS_CHOICES = [
        ('Single', 'Single'),
        ('Married', 'Married'),
        ('Divorced', 'Divorced'),
        ('Widowed', 'Widowed'),
    ]

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=False, null=False)
    name = models.CharField(max_length=100, blank=True, null=True)
    father_name = models.CharField(max_length=100, blank=True, null=True)
    mother_name = models.CharField(max_length=100, blank=True, null=True)
    grandfather_name = models.CharField(max_length=100, blank=True, null=True)
    marital_status = models.CharField(max_length=20, choices=MARITAL_STATUS_CHOICES, blank=True, null=True)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, blank=True, null=True)
    nationality = models.CharField(max_length=50, blank=True, null=True)
    identity_type = models.CharField(max_length=20, blank=True, null=True)
    identity_number = models.CharField(max_length=20, blank=True, null=True)
    identity_documents_front = models.FileField(upload_to="identity/%Y/%m/%d/front/", blank=True, null=True)
    identity_documents_back = models.FileField(upload_to="identity/%Y/%m/%d/back/", blank=True, null=True)
    secondary_mobile_number = models.CharField(max_length=20, blank=True, null=True)
    email_address = models.EmailField(blank=True, null=True)
    whatsapp_viber_number = models.CharField(max_length=20, blank=True, null=True)
    permanent_address_country = models.CharField(max_length=100, blank=True, null=True)
    permanent_address_state = models.CharField(max_length=100, blank=True, null=True)
    permanent_address_district = models.CharField(max_length=100, blank=True, null=True)
    permanent_address_municipality = models.CharField(max_length=100, blank=True, null=True)
    permanent_address_city_village_area = models.CharField(max_length=100, blank=True, null=True)
    permanent_address_ward_no = models.CharField(max_length=10, blank=True, null=True)
    is_current_address_same_as_permanent = models.BooleanField(default=True)
    current_address_country = models.CharField(max_length=100, blank=True, null=True)
    current_address_state = models.CharField(max_length=100, blank=True, null=True)
    current_address_district = models.CharField(max_length=100, blank=True, null=True)
    current_address_municipality = models.CharField(max_length=100, blank=True, null=True)
    current_address_city_village_area = models.CharField(max_length=100, blank=True, null=True)
    current_address_ward_no = models.CharField(max_length=10, blank=True, null=True)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    highest_education = models.CharField(max_length=100, blank=True, null=True)
    hobbies = models.TextField(blank=True, null=True)
    expertise = models.TextField(blank=True, null=True)
    blood_group = models.CharField(max_length=10, blank=True, null=True)
    accept = models.BooleanField(default=False)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "KYC"
        verbose_name_plural = "KYC"


class VisitorsMessage(BaseModel):
    message = models.TextField()
    visitor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.ImageField(
        upload_to='visitors/messages',
        validators=[validate_image_size],
        null=True,
        blank=True
    )

    def __str__(self):
        return str(self.id) + str(self.visitor)
