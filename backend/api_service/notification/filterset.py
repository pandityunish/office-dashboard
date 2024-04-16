from django_filters import rest_framework as filters

from notification.choices import VISITOR_CHOICES, NOTIFICATION_TYPE_CHOICES
from notification.models import NotificationData


class NotificationDataFilter(filters.FilterSet):
    notification_type = filters.ChoiceFilter(choices=NOTIFICATION_TYPE_CHOICES)
    audience = filters.ChoiceFilter(choices=VISITOR_CHOICES)
    created_at = filters.DateRangeFilter()
    class Meta:
        model = NotificationData
        fields = ['notification_type', 'audience', 'created_at']