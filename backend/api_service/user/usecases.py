from django.utils import timezone
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken

from common.usecases import BaseUseCase
from organization.models import Device
from user.models import CustomUser, Subscription

from user.utils import generate_otp, send_otp_to_user


class LoginUseCase(BaseUseCase):
    def __init__(self, serializer, request):
        super().__init__(serializer)
        self.serializer = serializer
        self.request = request

    def _register_device(self, user):
        user_agent = self.request.META.get('HTTP_USER_AGENT', 'Unknown Device')
        ip_address = self.request.META.get('REMOTE_ADDR', 'Unknown IP')

        Device.objects.create(
            name_of_device=user_agent,
            device_type=user_agent,
            organization=user,
            ip_address=ip_address,
        )

    def _factory(self):
        password = self._data.get('password')
        data_credentials = self._data.get('username')
        user = None
        if self._data.get('login_type') == 'email':
            user = CustomUser.objects.filter(email=data_credentials).first()
            if not user:
                raise ValidationError({
                    'error': 'Error user does not exist in the system for given email.'
                })

        elif self._data.get('login_type') == 'mobile':
            user = CustomUser.objects.filter(mobile_number=data_credentials).first()
            if not user:
                raise ValidationError({
                    'error': 'Error user does not exist in the for the given mobile number'
                })
        if user:
            if not user.is_sms_verified:
                raise ValidationError(
                    {'error': 'User is not verified by sms. Please try verifying your mobile number.'})
        if not user.is_active:
            raise ValidationError({'error': 'User is not active'})
        if not user.check_password(password):
            raise ValidationError({'error': 'Incorrect  password please try again.'})

        if user.is_organization:
            try:
                # TODO  Subscription need to be handled separately
                user_subscription = Subscription.objects.filter(user=user).first()
                # if not user_subscription:
                #     raise ValidationError({
                #         'error': 'Subscription does not exists for this user'
                #     })
                current_time = timezone.now()
                end_subscription = user_subscription.end_subscription
                if user_subscription.lock_org:
                    raise ValidationError({"message": "Your Organization is locked please contact to admin."})
                if current_time > end_subscription:
                    raise ValidationError({"message": "Your contract is expired please contact to admin.", })
            except:
                pass

        self._register_device(user)

        refresh = RefreshToken.for_user(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }


class ForgetPasswordUseCase(BaseUseCase):
    def __init__(self, serializer):
        super().__init__(serializer)
        self.serializer = serializer

    def _factory(self):

        mobile_number = self._data.get("mobile_number")
        try:
            user = CustomUser.objects.get(
                mobile_number=mobile_number, is_sms_verified=True
            )
        except CustomUser.DoesNotExist:
            raise ValidationError({"error": "User with this  mobile number does not exist in the system"})

        otp = generate_otp()
        otp_message = (f"Dear User please use this OTP code to "
                       f"reset your password your code is {otp}. This is for one "
                       f"time use only. Thank you!")
        send_otp_to_user(user.mobile_number, otp_message)
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()


class UserUpdateUseCase(BaseUseCase):
    def __init__(self, instance, serializer):
        self._instance = instance
        super().__init__(serializer)

    def _is_valid(self):
        if CustomUser.objects.filter(mobile_number=self._data['mobile_number']).exists():
            raise ValidationError({
                'error': "Organization with this mobile number already exists"
            })
        if CustomUser.objects.filter(email=self._data['email']).exists():
            raise ValidationError({
                'error': "Organization with this email already exists."
            })
        return True

    def _factory(self):
        if self._is_valid():
            for data in self._data.keys():
                setattr(self._instance, data, self._data[data])

            self._instance.save()


class UserImageUpdateUseCase(BaseUseCase):
    def __init__(self, instance, serializer):
        self._instance = instance
        super().__init__(serializer)

    def _factory(self):
        for data in self._data.keys():
            setattr(self._instance, data, self._data[data])
        self._instance.save()
