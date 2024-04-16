from django.contrib import admin

from .models import Notification,NotificationData
from common.admin import CustomModelAdmin


# @admin.register(Notification)
# class NotificationAdmin(admin.ModelAdmin):
#     list_display = ("name", "message", "timestamp", "user")
#     list_filter = ("user", "timestamp")
#     search_fields = ("name", "message", "user__full_name")
#     list_per_page = 25


@admin.register(NotificationData)
class NotificationAdmin(CustomModelAdmin):
    list_display = ("notification_type", "audience", "title", "message", "attach_file", "is_seen", "created_at", "updated_at")
    list_filter = ("is_seen", "created_at", "updated_at")
    search_fields = ("notification_type", "audience", "title", "Message")
    list_per_page = 25
