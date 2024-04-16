import django_filters
from django.db.models import Q
from django_filters.widgets import RangeWidget

from organization.models import OrganizationBranch

from organization.models import OrganizationVisitHistory


class OrganizationBranchFilter(django_filters.FilterSet):
    search_term = django_filters.CharFilter(method='filter_search')
    date = django_filters.DateFromToRangeFilter(widget=RangeWidget(
        attrs={'type': 'date'})
        , field_name='created_at',
        label='date range'
    )

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) |
            Q(email__icontains=value) |
            Q(mobile_no__icontains=value)
        )

    class Meta:
        model = OrganizationBranch
        fields = ['search_term', 'date']


class OrganizationVisitHistoryFilter(django_filters.FilterSet):
    MANUAL = 'Manual'
    SCAN = 'Scan'

    VISIT_CHOICES = [
        (MANUAL, 'Manual'),
        (SCAN, 'Scan'),
    ]
    search_term = django_filters.CharFilter(method='filter_search')
    visit_type = django_filters.ChoiceFilter(choices=VISIT_CHOICES)

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(full_name__icontains=value) |
            Q(email__icontains=value) |
            Q(mobile_number__icontains=value)
        )

    class Meta:
        model = OrganizationVisitHistory
        fields = ['search_term', 'visit_type']
