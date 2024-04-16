from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "mobile_number",
            "full_name",
            "email",
            "password",
            "address",
            "is_organization",
            "is_visitor",
            "otp",
            "otp_created_at",
            "organization_name",
            "organization_type",
            "organization_nature",
            "approve_visitor_before_access",
            "check_in_check_out_feature",
            "qr",
            "profile_picture",
        )

        read_only_fields = ("is_admin", "is_staff")
        extra_kwargs = {"otp": {"write_only": True}, "password": {"write_only": True}}

    def create(self, validated_data):
        if validated_data.get('mobile_number'):
            if CustomUser.objects.filter(mobile_number=validated_data.get('mobile_number')).exists():
                raise serializers.ValidationError({
                    'mobile_number': 'User with this mobile number already exists please try new phone number'
                })

        if validated_data.get('is_organization'):
            if not validated_data.get('email'):
                raise serializers.ValidationError("email is required")

            if CustomUser.objects.filter(email=validated_data.get('email')).exists():
                raise serializers.ValidationError("Email already exists in the system please try another email")

            if not validated_data.get('organization_name'):
                raise serializers.ValidationError("Organization_name is required.")

            if not validated_data.get('organization_type'):
                raise serializers.ValidationError("Organization Type is required")

        password = validated_data.pop("password")
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if "password" in validated_data:
            password = validated_data.pop("password")
            instance.set_password(password)
        return super().update(instance, validated_data)


class CustomUserSerializerLoginDetails(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "organization_status",
            "mobile_number",
            "full_name",
            "email",
            "password",
            "is_active",
            "is_sms_verified",
            "is_kyc_verified",
            "address",
            "is_organization",
            "is_visitor",
            "otp",
            "otp_created_at",
            "organization_name",
            "organization_type",
            "organization_nature",
            "approve_visitor_before_access",
            "check_in_check_out_feature",
            "qr",
            "validation_token_of_organization",
            "profile_picture",
        )

        read_only_fields = ("is_admin", "is_staff", "validation_token_of_organization")
        extra_kwargs = {"otp": {"write_only": True}, "password": {"write_only": True}}


class VerifyOTPSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=10)
    otp = serializers.CharField(max_length=5)


class ForgotPasswordSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=10)


class ResetPasswordSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=10)
    otp = serializers.CharField(max_length=5)
    new_password = serializers.CharField(max_length=128)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class ResendOTPSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=15)


class CreateUserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['mobile_number', 'full_name', 'email']

    def create(self, validated_data):
        # Set 'is_active' and 'is_sms_verified' to True
        validated_data['is_active'] = True
        validated_data['is_sms_verified'] = True

        # Call the create method of the parent class (ModelSerializer)
        return super().create(validated_data)

    def validate(self, data):
        # Add custom validation logic here if needed
        return data


from user.models import ORGANIZATION_TYPES, ORGANIZATION_NATURE_TYPES


class CustomUserPatchSerializer(serializers.Serializer):
    mobile_number = serializers.CharField(max_length=10, read_only=True)
    full_name = serializers.CharField(max_length=300, required=False, allow_blank=True, allow_null=True)
    email = serializers.EmailField(max_length=300, required=False, allow_blank=True, allow_null=True)
    approve_visitors = serializers.BooleanField(required=False)
    address = serializers.CharField(max_length=200, required=False, allow_blank=True, allow_null=True)
    organization_name = serializers.CharField(max_length=250, required=False, allow_blank=True, allow_null=True)
    organization_type = serializers.ChoiceField(choices=ORGANIZATION_TYPES, required=False, allow_blank=True,
                                                allow_null=True)
    organization_nature = serializers.ChoiceField(choices=ORGANIZATION_NATURE_TYPES, required=False, allow_blank=True,
                                                  allow_null=True)
    approve_visitor_before_access = serializers.BooleanField(required=False)
    check_in_check_out_feature = serializers.BooleanField(required=False)

    class Meta:
        model = CustomUser
        fields = [
            'mobile_number', 'full_name', 'email', 'approve_visitors', 'address',
            'organization_name', 'organization_type', 'organization_nature',
            'approve_visitor_before_access', 'check_in_check_out_feature'
        ]

    def update(self, instance, validated_data):
        for field in validated_data:
            setattr(instance, field, validated_data[field])

        instance.save()
        return instance


class LoginSerializer(serializers.Serializer):
    LOGIN_TYPE_CHOICES = (
        ('mobile', 'Mobile'),
        ('email', 'Email'),
    )
    username = serializers.CharField()
    password = serializers.CharField()
    login_type = serializers.ChoiceField(choices=LOGIN_TYPE_CHOICES)

    def validate(self, data):
        login_type = data.get('login_type')
        mobile_number_or_email = data.get('username')

        if login_type == 'email':
            # Check if the entered value is a valid email address
            if not serializers.EmailField().to_internal_value(mobile_number_or_email):
                raise ValidationError("Invalid email format")

        elif login_type == 'mobile':
            # Check if the entered value is a valid mobile number
            if len(mobile_number_or_email) != 10 or not mobile_number_or_email.isdigit():
                raise ValidationError("Mobile number must be 10 digits")
        return data


class CustomUserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'full_name',
            'mobile_number',
            'address',
            'email'
        )


class CustomUserImageUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'profile_picture',
        )


class CustomUserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            "id",
            "organization_status",
            "mobile_number",
            "full_name",
            "email",
            "is_active",
            "is_sms_verified",
            "is_kyc_verified",
            "address",
            "is_organization",
            "is_visitor",
            "organization_name",
            "organization_type",
            "organization_nature",
            "approve_visitor_before_access",
            "check_in_check_out_feature",
            "qr",
            "validation_token_of_organization",
            "profile_picture",
        )
