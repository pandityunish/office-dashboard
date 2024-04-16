from django.contrib import admin
from .models import StaffUser
from common.admin import CustomModelAdmin


@admin.register(StaffUser)
class StaffUserAdmin(CustomModelAdmin):
    list_display = ("email", "full_name", "mobile_no", "address","active","mobile_number","organization","role")
    list_filter = (
        "active",
        "organization",
        "role"
    )
    search_fields = (
        "email",
        "full_name",
        "mobile_no",
        "address",
        "active",
        "mobile_number",
        "organization__full_name",
        "role"
    )
    list_per_page = 20
