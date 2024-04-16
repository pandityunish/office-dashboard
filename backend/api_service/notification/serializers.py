from urllib.parse import urlsplit

from rest_framework import serializers

from .models import Notification, NotificationData


class NotificationSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = NotificationData
        fields = [
            'id',
            'organization_id',
            'notification_type',
            'audience',
            'title',
            'message',
            'file',
            'is_seen',
            'created_at',
            'updated_at'
        ]

    def get_file(self, obj):
        if obj.attach_file:
            parsed_url = urlsplit(obj.attach_file.url)
            return parsed_url.path
        return None


class NotificationDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationData
        exclude = ['is_archived', 'created_at', 'updated_at', 'is_seen', ]


class CreateNotificationDataSerializer(NotificationDataSerializer):
    class Meta(NotificationDataSerializer.Meta):
        model = NotificationData
        exclude = [
            'is_archived',
            'created_at',
            'updated_at',
            'is_seen',
            'organization_id',
            'user_id'
        ]


class OrganizationNotificationCountSerializer(serializers.Serializer):
    count = serializers.IntegerField()


class RegisterUserDeviceSerializer(serializers.Serializer):
    token = serializers.CharField()
