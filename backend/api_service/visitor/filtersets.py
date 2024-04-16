from django.db.models import Q
from django_filters import rest_framework as django_filters
from django_filters.widgets import RangeWidget

from organization.models import OrganizationVisitHistory


class OrganizationVisitHistoryFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='perform_search')
    created_at = django_filters.DateFromToRangeFilter(
        widget=RangeWidget(attrs={'type': 'date'}), field_name='created_at',
        label='date_filter')

    class Meta:
        model = OrganizationVisitHistory
        fields = [
            'created_at',
            'search'
        ]

    def perform_search(self, queryset, name, value):
        if value:
            return queryset.filter(
                Q(visitor__full_name__icontains=value) |
                Q(purpose__icontains=value) |
                Q(full_name__icontains=value) |
                Q(mobile_number__icontains=value) |
                Q(vehicle_number__icontains=value) |
                Q(visiting_from__icontains=value)
            )
        return queryset
