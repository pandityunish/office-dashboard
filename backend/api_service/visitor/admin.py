from django.contrib import admin
from django.utils.html import format_html

from .models import VisitorKYC, VisitorsMessage
from common.admin import CustomModelAdmin


# Define admin classes for your models
# @admin.register(VisitorKYC)
# class VisitorKYCAdmin(admin.ModelAdmin):
#     list_display = (
#         "user",
#         "name",
#         "father_name",
#         "mother_name",
#         "marital_status",
#         "gender",
#         "nationality",
#         "identity_type",
#         "identity_number",
#         "email_address",
#         "whatsapp_viber_number",
#         "permanent_address_country",
#         "permanent_address_state",
#         "permanent_address_district",
#         "permanent_address_municipality",
#     )
#     search_fields = ("user__username", "name", "identity_number")
#     list_per_page = 20

# fieldsets = (
#     (
#         "Personal Information",
#         {
#             "fields": (
#                 "user",
#                 "name",
#                 "father_name",
#                 "mother_name",
#                 "grandfather_name",
#                 "marital_status",
#                 "gender",
#                 "nationality",
#                 "identity_type",
#                 "identity_number",
#                 "identity_documents_front",
#                 "identity_documents_back",
#                 "secondary_mobile_number",
#                 "email_address",
#                 "whatsapp_viber_number",
#             ),
#         },
#     ),
#     (
#         "Permanent Address",
#         {
#             "fields": (
#                 "permanent_address_country",
#                 "permanent_address_state",
#                 "permanent_address_district",
#                 "permanent_address_municipality",
#                 "permanent_address_city_village_area",
#                 "permanent_address_ward_no",
#             ),
#         },
#     ),
#     (
#         "Current Address",
#         {
#             "fields": (
#                 "is_current_address_same_as_permanent",
#                 "current_address_country",
#                 "current_address_state",
#                 "current_address_district",
#                 "current_address_municipality",
#                 "current_address_city_village_area",
#                 "current_address_ward_no",
#             ),
#         },
#     ),
#     (
#         "Additional Information",
#         {
#             "fields": (
#                 "occupation",
#                 "highest_education",
#                 "hobbies",
#                 "expertise",
#                 "blood_group",
#             ),
#         },
#     ),
# )

# readonly_fields = (
#     "user",
#     "identity_documents_front_link",
#     "identity_documents_back_link",
# )

# def identity_documents_front_link(self, obj):
#     if obj.identity_documents_front:
#         return format_html(
#             '<a href="{}" target="_blank">{}</a>',
#             obj.identity_documents_front.url,
#             "Front",
#         )
#     return "No Front Document"

# identity_documents_front_link.short_description = "Identity Documents Front"

# def identity_documents_back_link(self, obj):
#     if obj.identity_documents_back:
#         return format_html(
#             '<a href="{}" target="_blank">{}</a>',
#             obj.identity_documents_back.url,
#             "Back",
#         )
#     return "No Back Document"

# identity_documents_back_link.short_description = "Identity Documents Back"


class VisitorKYCAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'gender', 'marital_status', 'nationality', 'occupation', 'highest_education']
    list_filter = ['name', 'user__full_name', 'user__organization_name', 'email_address']
    search_fields = ['name', 'user__full_name', "nationality", 'user__organization_name', 'email_address']
    ordering = ['name', 'user__organization_name', 'nationality', 'occupation', 'highest_education']
    list_per_page = 20


admin.site.register(VisitorKYC, VisitorKYCAdmin)


@admin.register(VisitorsMessage)
class VisitorMessage(CustomModelAdmin):
    list_display = ['visitor']
