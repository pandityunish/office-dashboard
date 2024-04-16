import base64
import binascii
from urllib.parse import urlsplit

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from user.models import ORGANIZATION_TYPES, CustomUser

from common.utils import validate_image_size

from user.serializers import CustomUserSerializerLoginDetails

from .choices import TYPE_OF_ID
from user.serializers import CustomUserDetailSerializer

User = get_user_model()
from .models import (
    OrganizationBranch,
    OrganizationDocument,
    OrganizationKYC,
    OrganizationSocialMediaLink,
    OrganizationVisitHistory, OrganizationKYCDocument, OrganizationKYCSocialMediaLink,
)


class OrganizationKYCSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(required=False)

    class Meta:
        model = OrganizationKYC
        fields = (
            "id",
            "establishment_year",
            "vat_number",
            "pan_number",
            "registration_number",
            "country",
            "state",
            "district",
            "municipality",
            "city_village_area",
            "ward_no",
            "organization_summary",
            "whatsapp_viber_number",
            "secondary_number",
            "telephone_number",
            "website",
            "logo",
            "organization",
            "accept",
        )
        read_only_fields = (
            ""
            "qr",
            "approve_visitor_before_access",
            "check_in_check_out_feature",
            "accept",
        )


class OrganizationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        # fields="__all__"
        exclude = ['password']


class OrganizationNameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('organization_name',)


class OrganizationCreateSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=10)
    full_name = serializers.CharField(max_length=300)
    email = serializers.EmailField(max_length=300)
    password = serializers.CharField(max_length=128, write_only=True)
    organization_type = serializers.ChoiceField(choices=ORGANIZATION_TYPES)
    organization_name = serializers.CharField(max_length=250)

    def validate_mobile_number(self, value):
        try:
            CustomUser.objects.get(mobile_number=value)
            raise serializers.ValidationError(
                "Mobile number already in use. Please contact the administrator or reset your password."
            )
        except CustomUser.DoesNotExist:
            return value

    def create(self, validated_data):
        return CustomUser.objects.create_organization(**validated_data)


class OrganizationGetSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(source='organizationkyc.logo')

    class Meta:
        model = CustomUser
        fields = ["id",
                  "mobile_number",
                  "address",
                  "address",
                  "full_name",
                  "email",
                  "is_kyc_verified",
                  "organization_name",
                  "organization_type",
                  "organization_nature",
                  "qr",
                  "profile_picture",
                  "logo"
                  ]
        # fields = "__all__"
        # excludes = ['password']


class InnerUser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class OrganizationVisitHistorySerializer(serializers.ModelSerializer):
    UserOrg = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationVisitHistory

        fields = (
            "id",
            "UserOrg",
            "organization",
            "visitor",
            "full_name",
            "mobile_number",
            "purpose",
            "have_vehicle",
            "vehicle_number",
            "is_with_team",
            "number_of_team",
            "visiting_from",  # branch
            "is_approved",
            "departed_at",
            "visited_at",  # date
            "type_of_id",
            "id_number",
            "email",
            "remarks",
            "photo",
            "qr",
            "created_at",
            "updated_at",
        )

        read_only_fields = ["id", "visited_at", "created_at", "updated_at"]

    def get_UserOrg(self, obj):
        if obj.visitor:
            user_fields = User.objects.filter(id=obj.visitor.id).values(
                "full_name",
                "address",
                "email",
                "organization_name",
                "organization_type",
                "organization_nature",
                "qr"
            ).first()
            return user_fields
        return None


class OrganizationVisitHistorySerializerSingle(serializers.ModelSerializer):
    UserOrg = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationVisitHistory

        fields = (
            "id",
            "UserOrg",
            "organization",
            "visitor",
            "full_name",
            "mobile_number",
            "purpose",
            "have_vehicle",
            "vehicle_number",
            "is_with_team",
            "number_of_team",
            "visiting_from",  # branch
            "is_approved",
            "departed_at",
            "visited_at",  # date
            "type_of_id",
            "id_number",
            "email",
            "remarks",
            "photo",
        )

        read_only_fields = ["id", "visited_at"]

    def get_UserOrg(self, obj):
        if obj.visitor:
            user_fields = User.objects.filter(id=obj.visitor.id).values("full_name", "address", "email",
                                                                        "organization_name", "organization_type",
                                                                        "organization_nature", "qr").first()

            # serializer = InnerUser(user_fields)
            return user_fields
        return None
        # return serializer.data


class OrganizationVisitHistorySerializerGet(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.organization_name', allow_null=True)
    Organization = serializers.SerializerMethodField()

    visitor = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationVisitHistory
        fields = (
            "organization_name",
            "visiting_from",
            "visited_at",
            "organization",
            "visitor",
            "full_name",
            # "email"
            # "mobile_number",
            "purpose",
            "have_vehicle",
            "vehicle_number",
            "is_with_team",
            "number_of_team",
            "visiting_from",
            "is_approved",
            "visited_at",
            "departed_at",
            "photo",
            "qr",
            "type_of_id",
            "id_number",
            "remarks",
            "Organization",
        )

    def get_Organization(self, obj):
        user_fields = User.objects.filter(id=obj.visitor.id).values("full_name", "address", "email",
                                                                    "organization_name", "organization_type",
                                                                    "organization_nature", "qr").first()
        return user_fields

    def get_visitor(self, obj):
        user_fields = User.objects.filter(id=obj.visitor.id).values("full_name", "address", "email",
                                                                    "organization_name", "organization_type",
                                                                    "organization_nature", "qr").first()
        return user_fields


class CustomUserSerializerOrgName(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('organization_name',)


class CustomUserSerializerVisitorName(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('full_name',)


class OrganizationVisitHistorySerializerReport(serializers.ModelSerializer):
    organization = CustomUserSerializerOrgName()
    visitor = CustomUserSerializerVisitorName()

    class Meta:
        model = OrganizationVisitHistory
        fields = (
            "id",
            "organization",
            "email",
            "visitor",
            "mobile_number",
            "purpose",
            "have_vehicle",
            "vehicle_number",
            "is_with_team",
            "number_of_team",
            "visiting_from",
            "is_approved",
            "departed_at",
            "visited_at",
        )

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        organization_name = representation['organization']['organization_name']
        representation['organization'] = organization_name
        organization_name = representation['visitor']['full_name']

        representation['visitor'] = organization_name
        return representation


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationBranch
        fields = "__all__"

    def create(self, validated_data):
        validated_data["organization"] = self.context["request"].user
        branch = OrganizationBranch.objects.create(**validated_data)
        return branch


class BranchSerializerGet(serializers.ModelSerializer):
    organization = CustomUserSerializerOrgName()

    class Meta:
        model = OrganizationBranch
        fields = "__all__"


class SocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationSocialMediaLink
        fields = (
            "id",
            "organization",
            "platform",
            "link",
        )


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationDocument
        fields = (
            "id",
            "organization",
            "name",
            "file",
        )


class OrganizationSettingsSerializer(serializers.Serializer):
    approve_visitor_before_access = serializers.BooleanField(required=False)
    # check_in_check_out_feature = serializers.BooleanField(required=False)


class GetNewOrganizationKYCSerializer(serializers.ModelSerializer):
    # UserOrg = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationKYC
        fields = '__all__'

    # def get_UserOrg(self, obj):
    #     user_fields = User.objects.filter(id=obj.id).values("full_name","email","organization_name","organization_type","organization_nature","qr").first()
    #     # serializer = InnerUser(user_fields)
    #     return user_fields
    #     # return serializer.data


class NewOrganizationKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationKYC
        fields = '__all__'


from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = '__all__'


from .models import Purpose


class PurposeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purpose
        fields = "__all__"


from .models import OrganizationContent


class OrganizationContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationContent
        fields = '__all__'


from .models import AdsBanner


class AdsBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdsBanner
        fields = '__all__'


class ListAdsBannerSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()

    class Meta:
        model = AdsBanner
        fields = ['id', 'title', 'image', 'image_path', 'link_url', 'created_at']

    def get_image_path(self, obj):
        parsed_url = urlsplit(obj.image.url)
        return parsed_url.path


class CreateOrganizationKYCSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationKYC
        fields = [
            'establishment_year',
            'vat_number',
            'pan_number',
            'registration_number',
            'country',
            'state',
            'district',
            'municipality',
            'city_village_area',
            'ward_no',
            'contact_person_full_name',
            'organization_summary',
            'whatsapp_viber_number',
            'secondary_number',
            'telephone_number',
            'website',
            'logo',
            'registration_certificate',
            'PAN_VAT_certificate',
            'licenses', 'citizenship', 'passport',
            'driving_license',
            'social_media_links',
        ]


class ListOrganizationKYCSerializer(serializers.ModelSerializer):
    organization_id = serializers.IntegerField(source='organization.id')

    class Meta:
        model = OrganizationKYC
        fields = [
            'id',
            'organization_id',
            'establishment_year',
            'vat_number',
            'pan_number',
            'registration_number',
            'country',
            'state',
            'district',
            'municipality',
            'city_village_area',
            'ward_no',
            'contact_person_full_name',
            'organization_summary',
            'whatsapp_viber_number',
            'secondary_number',
            'telephone_number',
            'website',
            'logo',
            'registration_certificate',
            'PAN_VAT_certificate',
            'licenses', 'citizenship', 'passport',
            'driving_license',
            'social_media_links',
            'status'
        ]


class OrganizationBranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationBranch
        fields = [
            'name',
            'email',
            'branch_no',
            'contact_person',
            'mobile_no',
            'country',
            'state',
            'district',
            'municipality',
            'city_village_area',
            'ward_no',
            'employee_size',
            'lock_branch',
        ]

    def validate_email(self, value):
        if not value:
            raise ValidationError(
                {
                    'error': 'email  is required '
                }
            )
        return value

    def validate_mobile_no(self, value):
        if not value.isdigit() and len(value) != 10:
            raise ValidationError(
                {
                    'error': 'Mobile number is required and must be 10 digit number.'
                }
            )
        return value


class ListOrganizationBranchSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.organization_name')
    organization_id = serializers.CharField(source='organization.id')

    class Meta:
        model = OrganizationBranch
        fields = [
            'id',
            'created_at',
            'updated_at',
            'organization_name',
            'organization_id',
            'name',
            'email',
            'branch_no',
            'contact_person',
            'mobile_no',
            'country',
            'state',
            'district',
            'municipality',
            'city_village_area',
            'ward_no',
            'employee_size',
            'lock_branch',
        ]


class UpdateOrganizationKYCLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationKYC
        fields = [
            'logo',
        ]


class OrganizationSocialMediaLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationKYCSocialMediaLink
        fields = ['name', 'link']


class CreateOrganizationKYCDocumentSerializer(serializers.ModelSerializer):
    file = serializers.CharField(allow_null=True)

    def validate_base64_field(self, value):
        try:
            base64.b64decode(value)
            return value
        except binascii.Error:
            raise serializers.ValidationError("Field must be a valid base64 string")

    class Meta:
        model = OrganizationKYCDocument
        fields = ['name', 'file']

    def validate_file(self, value):
        return self.validate_base64_field(value)


class ListOrganizationKYCDocumentSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationKYCDocument
        fields = ['name', 'file']

    def get_file(self, obj):
        parsed_url = urlsplit(obj.file.url)
        return parsed_url.path


class CreateOrganizationKycSerializer(serializers.ModelSerializer):
    social_media_links = OrganizationSocialMediaLinkSerializer(many=True)
    documents = CreateOrganizationKYCDocumentSerializer(many=True)

    # Custom validation method for validating base64 strings
    def validate_base64_field(self, value):
        try:
            base64.b64decode(value)
            return value
        except binascii.Error:
            raise serializers.ValidationError("Field must be a valid base64 string")

    establishment_year = serializers.IntegerField()
    vat_number = serializers.CharField(max_length=50, required=False, allow_blank=True)
    pan_number = serializers.CharField(max_length=50, required=False, allow_blank=True)
    registration_number = serializers.CharField(max_length=50, required=False, allow_blank=True)
    country = serializers.CharField(max_length=100, required=False, allow_blank=True)
    state = serializers.CharField(max_length=100, required=False, allow_blank=True)
    district = serializers.CharField(max_length=100, required=False, allow_blank=True)
    municipality = serializers.CharField(max_length=100, required=False, allow_blank=True)
    city_village_area = serializers.CharField(max_length=100, required=False, allow_blank=True)
    ward_no = serializers.IntegerField(required=False)
    contact_person_full_name = serializers.CharField(max_length=20, required=False, allow_blank=True)
    organization_summary = serializers.CharField(required=False, allow_blank=True)
    whatsapp_viber_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    secondary_number = serializers.CharField(max_length=20, allow_blank=True)
    telephone_number = serializers.CharField(max_length=20, allow_blank=True)
    website = serializers.URLField(required=False, allow_blank=True)
    logo = serializers.CharField(required=False, allow_blank=True)
    registration_certificate = serializers.CharField(required=False, allow_blank=True)
    PAN_VAT_certificate = serializers.CharField(required=False, allow_blank=True)
    licenses = serializers.CharField(required=False, allow_blank=True)
    citizenship = serializers.CharField(required=False, allow_blank=True)
    passport = serializers.CharField(required=False, allow_blank=True)
    driving_license = serializers.CharField(required=False, allow_blank=True)

    def validate_logo(self, value):
        return self.validate_base64_field(value)

    def validate_registration_certificate(self, value):
        return self.validate_base64_field(value)

    def validate_PAN_VAT_certificate(self, value):
        return self.validate_base64_field(value)

    def validate_licenses(self, value):
        return self.validate_base64_field(value)

    def validate_citizenship(self, value):
        return self.validate_base64_field(value)

    def validate_passport(self, value):
        return self.validate_base64_field(value)

    def validate_driving_license(self, value):
        return self.validate_base64_field(value)

    class Meta:
        model = OrganizationKYC
        fields = (
            'establishment_year',
            'vat_number',
            'pan_number',
            'registration_number',
            'country',
            'state',
            'district',
            'municipality',
            'city_village_area',
            'ward_no',
            'contact_person_full_name',
            'organization_summary',
            'whatsapp_viber_number',
            'secondary_number',
            'telephone_number',
            'website',
            'logo',
            'registration_certificate',
            'PAN_VAT_certificate',
            'licenses',
            'citizenship',
            'passport',
            'driving_license',
            'social_media_links',
            'documents'
        )


class OrganizationListKYCSerializer(serializers.ModelSerializer):
    social_media_links = OrganizationSocialMediaLinkSerializer(many=True)
    documents = ListOrganizationKYCDocumentSerializer(many=True)
    organization = CustomUserSerializerLoginDetails()
    logo = serializers.SerializerMethodField()
    registration_certificate = serializers.SerializerMethodField()
    PAN_VAT_certificate = serializers.SerializerMethodField()
    licenses = serializers.SerializerMethodField()
    citizenship = serializers.SerializerMethodField()
    passport = serializers.SerializerMethodField()
    driving_license = serializers.SerializerMethodField()

    class Meta:
        model = OrganizationKYC
        fields = '__all__'

    def get_logo(self, obj):
        if obj:
            parsed_url = urlsplit(obj.logo.url)
            return parsed_url.path
        return None

    def get_logo(self, obj):
        if obj:
            parsed_url = urlsplit(obj.logo.url)
            return parsed_url.path
        return None

    def get_registration_certificate(self, obj):
        if obj:
            parsed_url = urlsplit(obj.registration_certificate.url)
            return parsed_url.path
        return None

    def get_PAN_VAT_certificate(self, obj):
        if obj:
            parsed_url = urlsplit(obj.registration_certificate.url)
            return parsed_url.path
        else:
            return None

    def get_licenses(self, obj):
        if obj.licenses:
            parsed_url = urlsplit(obj.licenses.url)
            return parsed_url.path
        return None

    def get_citizenship(self, obj):
        if obj:
            parsed_url = urlsplit(obj.citizenship.url)
            return parsed_url.path
        else:
            return None

    def get_passport(self, obj):
        if obj:
            parsed_url = urlsplit(obj.passport.url)
            return parsed_url.path
        else:
            return None

    def get_driving_license(self, obj):
        if obj:
            parsed_url = urlsplit(obj.driving_license.url)
            return parsed_url.path
        else:
            return None


class ScanOrganizationByVisitorSerializer(serializers.ModelSerializer):
    address = serializers.CharField(required=True)
    purpose = serializers.CharField(required=True)

    class Meta:
        model = OrganizationVisitHistory
        fields = [
            'address',
            'purpose',

        ]


class ManualOrganizationEntrySerializer(serializers.Serializer):
    full_name = serializers.CharField(required=True)
    mobile_number = serializers.CharField(required=True, max_length=10)
    purpose = serializers.CharField(required=True)
    address = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    type_of_id = serializers.ChoiceField(TYPE_OF_ID)
    id_number = serializers.CharField(required=False)
    visiting_from = serializers.CharField(required=True)
    vehicle_number = serializers.CharField(required=False)
    have_vehicle = serializers.BooleanField()
    number_of_team = serializers.IntegerField(required=False)


class VisitorDataSerializer(serializers.ModelSerializer):
    organization = CustomUserDetailSerializer()
    visitor = CustomUserDetailSerializer()

    class Meta:
        model = OrganizationVisitHistory
        fields = [
            'organization',
            'visitor',
            'full_name',
            'email',
            'mobile_number',
            'purpose',
            'have_vehicle',
            'vehicle_number',
            'is_with_team',
            'number_of_team',
            'visiting_from',
            'is_approved',
            'visited_at',
            'departed_at',
            'photo',
            'qr',
            'type_of_id',
            'id_number',
            'remarks'
        ]


class VisitorDataForPdfSerializer(serializers.ModelSerializer):
    organization_name = serializers.CharField(source='organization.full_name')
    visited_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    departed_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    created_at = serializers.DateTimeField(format='%Y-%m-%d %H:%M')

    class Meta:
        model = OrganizationVisitHistory
        fields = [
            'id',
            'created_at',
            'organization_name',
            'visitor',
            'full_name',
            'email',
            'mobile_number',
            'purpose',
            'have_vehicle',
            'vehicle_number',
            'is_with_team',
            'number_of_team',
            'visiting_from',
            'is_approved',
            'visited_at',
            'visit_type',
            'departed_at',
            'photo',
            'qr',
            'type_of_id',
            'id_number',
            'remarks'
        ]


class VisitorCountsSerializer(serializers.Serializer):
    visit_type = serializers.CharField()
    count = serializers.IntegerField()
