from django.conf import settings
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe

from .models import CustomUser, Subscription
from common.admin import CustomModelAdmin


@admin.register(CustomUser)
class CustomUserAdmin(CustomModelAdmin):
    change_list_template = 'admin/change_list.html'

    list_display = (
        "id",
        "full_name",
        "mobile_number",
        "email",
        "organization_type",
        "is_organization",
        "is_active",
        "is_staff",
        "is_branch",
        "is_visitor",
        # "is_admin",
        # "address",
        "admin_of_organization",
        "approve_visitors",
        "qr_image",
        # "otp",
    )

    list_filter = ("is_organization", "is_visitor", "is_active", "is_staff", "is_admin")
    search_fields = ("full_name", "mobile_number", "email")
    list_per_page = 20

    fieldsets = (
        (
            "User Information",
            {
                "fields": (
                    "full_name",
                    "address",
                    "password",
                    "mobile_number",
                    'profile_picture',
                    "organization_type",
                    "organization_name",
                    "organization_nature",
                    "validation_token_of_organization",
                ),
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "admin_of_organization",
                    "user_permissions",
                    "approve_visitors",
                    "is_active",
                    "is_visitor",
                    "is_sms_verified",
                    "is_kyc_verified",
                    "is_organization",
                    "is_admin",
                    "is_staff",
                    "approve_visitor_before_access"
                ),
            },
        ),
        (
            "QR Code",
            {
                "fields": ("qr", "qr_image", 'profile_picture_image'),
                "classes": ("collapse",),
            },
        ),
    )
    readonly_fields = ("qr", "qr_image", "profile_picture_image", "validation_token_of_organization")

    def profile_picture_image(self, obj):
        if obj.profile_picture:
            return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
                url=obj.profile_picture.url,
                width=180,
                height=180,
            )
            )
        else:
            return ""

    profile_picture_image.short_description = 'Profile Picture Image'

    def qr_image(self, obj):
        if obj.qr:
            absolute_url = f"{settings.MEDIA_URL}{obj.qr.name}"
            return format_html('<img src="{}" style="max-width: 130px; max-height: 130px;" />', absolute_url)
        else:
            return ''

    qr_image.short_description = 'QR Code Image'


class SubscriptionAdmin(CustomModelAdmin):
    list_display = ["user_organization_name", "start_subscription", "end_subscription"]
    search_fields = ["user_organization_name", "start_subscription", "end_subscription"]
    # list_filter = ["user_organization_name"]
    ordering = ['-id']
    list_per_page = 20
    change_list_template = 'admin/change_list.html'

    def user_organization_name(self, obj):
        return obj.user.organization_name

    user_organization_name.short_description = "Organization Name"


admin.site.register(Subscription, SubscriptionAdmin)
