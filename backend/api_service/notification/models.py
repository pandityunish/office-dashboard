from django.contrib.auth import get_user_model
from django.db import models

from common.models import BaseModel

from notification.choices import VISITOR_CHOICES, NOTIFICATION_TYPE_CHOICES

User = get_user_model()


class Notification(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class NotificationData(BaseModel):
    organization_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="related_org_id",
        null=True,
        blank=True
    )
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='related_user',
        null=True,
        blank=True
    )
    notification_type = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        choices=NOTIFICATION_TYPE_CHOICES
    )
    audience = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        choices=VISITOR_CHOICES
    )
    title = models.CharField(
        max_length=255,
        null=True,
        blank=True
    )
    message = models.TextField(null=True, blank=True)
    attach_file = models.FileField(
        upload_to='attachments/',
        blank=True,
        null=True
    )
    is_seen = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Notification"
        verbose_name_plural = "Notification"


# Create your models here.
class FCMPushNotification(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    body = models.JSONField()
    data = models.JSONField()

    def __str__(self):
        return self.title
