import base64
import csv

import requests
from common.usecases import BaseUseCase
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.db import IntegrityError
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.http import HttpResponse
from django.utils import timezone
from notification.models import FCMPushNotification
from notification.models import Notification
from organization.models import OrganizationBranch
from organization.models import OrganizationKYC
from organization.models import OrganizationKYCDocument, OrganizationKYCSocialMediaLink
from organization.models import OrganizationVisitHistory
from rest_framework.exceptions import ValidationError
from user.models import CustomUser
from user.models import FCMDevices
from user.utils import generate_otp, generate_sms_text
from user.utils import send_otp_to_user, send_email

# import magic

User = get_user_model()


class DownloadBranchExcelUseCase(BaseUseCase):
    def __init__(self, instance):
        self._instance = instance
        super().__init__(serializer=None)

    def _factory(self):
        organization = self._instance
        branches = OrganizationBranch.objects.filter(organization=organization)

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="branches.csv"'

        writer = csv.writer(response)
        writer.writerow([
            'Name',
            'Email',
            'Branch No',
            'Contact Person',
            'Mobile No',
            'Country',
            'State',
            'District',
            'Municipality',
            'City/Village/Area',
            'Ward No',
            'Employee Size',
            'Lock Branch'
        ])

        for branch in branches:
            writer.writerow([
                branch.name,
                branch.email,
                branch.branch_no,
                branch.contact_person,
                branch.mobile_no,
                branch.country,
                branch.state,
                branch.district,
                branch.municipality,
                branch.city_village_area,
                branch.ward_no,
                branch.employee_size,
                branch.lock_branch
            ])

        return response


class CreateOrganizationBranchUseCase(BaseUseCase):
    def __init__(self, instance, serializer, request):
        self.request = request
        self.instance = instance
        self.serializer = serializer
        super().__init__(serializer=serializer)

    def create_notification(self):
        notification_config = {
            "user": self.request.user,
            "name": self.request.user.full_name,
            "message": f"{self._data.get('name')} Branch was created Successfully",
        }

        Notification.objects.create(**notification_config)

    def _factory(self):
        if OrganizationBranch.objects.filter(mobile_no=self._data.get('mobile_no')).exists():
            raise ValidationError(
                {
                    'error': ' Branch with this mobile number already exists.'
                }
            )
        if OrganizationBranch.objects.filter(email=self._data.get('email')).exists():
            raise ValidationError(
                {
                    'error': ' Branch with this email number already exists.'
                }
            )

        OrganizationBranch.objects.create(
            organization=self.instance,
            **self._data
        )
        self.create_notification()


class CreateOrganizationKYCUseCase(BaseUseCase):
    def __init__(self, instance, serializer, request):
        self.request = request
        self.instance = instance
        self.serializer = serializer
        super().__init__(serializer=serializer)

    @staticmethod
    def send_notification(organization):

        text = (f"Thank You! {organization.organization.full_name}"
                f" your KYC has been received we will contact you on further update!. E-Pass Team")
        send_email(text, "KYC Received", organization.organization.email)
        return send_otp_to_user(organization.organization.mobile_number, text)

    def add_organization_address(self, organization: OrganizationKYC):
        if self._data.get("district"):
            district = self._data.get("district")
        else:
            district = ''
        if self._data.get("municipality"):
            municipality = self._data.get("municipality")
        else:
            municipality = ''
        if self._data.get("city_village_area"):
            city_village_area = self._data.get("city_village_area")
        else:
            city_village_area = ''

        organization.organization.address = f"{district}, {municipality}, {city_village_area}, "
        organization.organization.save()

    def extension(self, file):
        return "image.png"

        # bytesData = io.BytesIO()
        # bytesData.write(base64.b64decode(file))
        # bytesData.seek(0)  # Jump to the beginning of the file-like interface to read all content!
        # return "document."+magic.from_buffer(bytesData.read()).split(' ')[0].lower()

    def _factory(self):
        try:
            # Pop base64 encoded file data from _data
            logo_data = self._data.pop('logo', None)
            registration_certificate_data = self._data.pop('registration_certificate', None)
            pan_vat_certificate_data = self._data.pop('PAN_VAT_certificate', None)
            licenses_data = self._data.pop('licenses', None)
            citizenship_data = self._data.pop('citizenship', None)
            passport_data = self._data.pop('passport', None)
            driving_license_data = self._data.pop('driving_license', None)

            # Pop social media links and documents from _data
            social_media_links_data = self._data.pop('social_media_links', [])
            documents_data = self._data.pop('documents', [])

            # Convert base64 encoded file data to file objects
            organization_kyc = OrganizationKYC.objects.create(
                organization=self.instance,
                **self._data
            )

            organization_kyc.logo.save(self.extension(logo_data), ContentFile(base64.b64decode(logo_data)),
                                       save=False) if logo_data else None
            organization_kyc.registration_certificate.save(self.extension(registration_certificate_data),
                                                           ContentFile(base64.b64decode(registration_certificate_data)),
                                                           save=False) if registration_certificate_data else None
            organization_kyc.PAN_VAT_certificate.save(self.extension(registration_certificate_data),
                                                      ContentFile(base64.b64decode(pan_vat_certificate_data)),
                                                      save=False) if pan_vat_certificate_data else None
            organization_kyc.licenses.save(self.extension(licenses_data), ContentFile(base64.b64decode(licenses_data)),
                                           save=False) if licenses_data else None
            organization_kyc.citizenship.save(self.extension(citizenship_data),
                                              ContentFile(base64.b64decode(citizenship_data)),
                                              save=False) if citizenship_data else None
            organization_kyc.passport.save(self.extension(passport_data), ContentFile(base64.b64decode(passport_data)),
                                           save=False) if passport_data else None
            organization_kyc.driving_license.save(self.extension(driving_license_data),
                                                  ContentFile(base64.b64decode(driving_license_data)),
                                                  save=False) if driving_license_data else None
            # Save the organization_kyc instance
            organization_kyc.save()
            self.add_organization_address(organization_kyc)
            self.send_notification(organization_kyc)
        except IntegrityError:
            raise ValidationError({
                'error': "Kyc already exists"
            })

        # Add social media links
        for social_media_data in social_media_links_data:
            social_media_link = OrganizationKYCSocialMediaLink.objects.create(**social_media_data)
            organization_kyc.social_media_links.add(social_media_link)

        # Add documents
        for doc_data in documents_data:
            doc_file_data = doc_data.pop('file', None)
            doc = OrganizationKYCDocument.objects.create(**doc_data)
            if doc_file_data:
                doc.file.save(self.extension(doc_file_data), ContentFile(base64.b64decode(doc_file_data)), save=True)
            organization_kyc.documents.add(doc)

        return organization_kyc


class ScanOrganizationUseCase(BaseUseCase):
    def __init__(self, serializer, request, instance):
        self.request = request
        self.instance = instance
        super().__init__(serializer=serializer)

    def _factory(self):
        visitor_history = OrganizationVisitHistory.objects.create(
            organization=self.instance,
            visitor=self.request.user,
            full_name=self.request.user.full_name if self.request.user.full_name else None,
            email=self.request.user.email if self.request.user.email else None,
            mobile_number=self.request.user.mobile_number if self.request.user.mobile_number else None,
            purpose=self._data.get('purpose'),
            visiting_from=self._data.get('address'),
            visit_type='Scan',
            is_approved=True if self.instance.approve_visitor_before_access else False
        )
        return self.response_data(visitor_history)

    def response_data(self, visitor_history):
        visit_data = {
            "organization": self.instance.id,
            "organization_full_name": self.instance.full_name if self.instance.full_name else None,
            "organization_address": self.instance.address if self.instance.address else None,
            "visitor": self.request.user.pk,
            "purpose": visitor_history.purpose,
            "mobile_number": self.request.user.mobile_number if self.request.user.mobile_number else None,
            "email": self.request.user.email if self.request.user.email else None,
            "visitor_name": self.request.user.full_name if self.request.user.full_name else None,
            "visiting_from": visitor_history.visiting_from,
            "is_approved": visitor_history.is_approved,
            "visit_type": visitor_history.visit_type,
            "visited_at": visitor_history.visited_at,

        }
        return visit_data


class ManualEntryOfVisitorUseCase(BaseUseCase):
    def __init__(self, instance, serializer):
        self.instance = instance
        super().__init__(serializer=serializer)

    def _factory(self):
        user, created = CustomUser.objects.get_or_create(
            mobile_number=self._data.get("mobile_number"),
            defaults={
                'full_name': self._data.get('full_name'),
                'email': self._data.get('email'),
                'is_organization': False,
                'is_visitor': True,
                'is_manual_user': True,
                'address': self._data.get('address')

            }
        )

        if created:
            otp = generate_otp()
            send_otp_to_user(user.mobile_number, generate_sms_text(otp))
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()

        return self.create_visit_history(user)

    def create_visit_history(self, user):
        visitor_history = OrganizationVisitHistory.objects.create(
            organization=self.instance,
            visitor=user,
            full_name=self._data.get('full_name'),
            email=self._data.get('email'),
            mobile_number=self._data.get('mobile_number'),
            purpose=self._data.get('purpose'),
            visiting_from=self._data.get('visiting_from'),
            type_of_id=self._data.get('type_of_id'),
            id_number=self._data.get('id_number'),
            visit_type='Manual',
            number_of_team=self._data.get('number_of_team'),
            is_approved=True if self.instance.approve_visitor_before_access else False
        )
        return {
            'organization': self.instance.full_name,
            'organization_id': self.instance.id,
            'full_name': visitor_history.full_name,
            'address': self._data.get('address'),
            'email': self._data.get('email'),
            'number_of_team': self._data.get('number_of_team'),
            'type_of_id': self._data.get('type_of_id'),
            'id_number': self._data.get('id_number'),
            'have_vehicle': self._data.get('have_vehicle'),
            'purpose': self._data.get('purpose'),
        }


class OrganizationSettingsUseCase(BaseUseCase):
    def __init__(self, serializer, instance):
        self.instance = instance
        super().__init__(serializer=serializer)

    def _factory(self):
        if self._data.get('approve_visitor_before_access') == self.instance.approve_visitor_before_access:
            raise ValidationError({
                'error': f' This organization already has  approve visitor before access status to  '
                         f'{self.instance.approve_visitor_before_access}'
            })
        else:
            self.instance.approve_visitor_before_access = self._data.get('approve_visitor_before_access')
            self.instance.save()







@receiver(post_save, sender=OrganizationVisitHistory)
def notify_visitor_on_visit(sender, instance, created, **kwargs):
    if created:
        visitor_device = FCMDevices.objects.filter(user=instance.visitor).first()

        if visitor_device:
            url = "https://fcm.googleapis.com/fcm/send"

            headers = {
                "Content-Type": "application/json",
                "Authorization": f"key={settings.FCM_DJANGO_SETTINGS.get('FCM_SERVER_KEY')}"
            }
            body = {
                "to": f"{visitor_device.registration_id}",
                "notification": {
                    "title": "Bravo! New  Your Entry has been recorded",
                    "body": f"New Entry  request from {instance.visitor.full_name}",
                    "mutable_content": True,
                    "sound": "Tri-tone"
                },

                "data": {
                    "url": "<url of media image>",
                    "dl": "<deeplink action on tap of notification>"
                }
            }

            response = requests.post(url, headers=headers, json=body)

            FCMPushNotification.objects.create(
                user=instance.visitor,
                title="New Entry Request",
                body=body,  # Use the body from the Message
                data={
                    "visitor_id": str(instance.visitor.id),
                    "organization_id": str(instance.organization.id)
                }
            )
