from django.contrib import admin
from .models import NotificationData
from common.admin import CustomModelAdmin
from .usecases import CreateNotificationUseCase

@admin.register(NotificationData)
class NotificationAdmin(CustomModelAdmin):
    list_display = ("notification_type", "audience", "title", "message", "attach_file", "is_seen", "created_at", "updated_at")
    list_filter = ("is_seen", "created_at", "updated_at")
    search_fields = ("notification_type", "audience", "title", "message")
    list_per_page = 25

    def save_model(self, request, obj, form, change):
        send_notifications = not change

        if send_notifications:
            data = {
                'title': obj.title,
                'message': obj.message,
                'notification_type': obj.notification_type,
                'audience': obj.audience,
                'user_id': obj.user_id.id if obj.user_id else None,
                'attach_file': obj.attach_file
            }

            usecase = CreateNotificationUseCase(instance=obj.organization_id, serializer=None, data=data)
            usecase._factory()