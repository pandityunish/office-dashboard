from django.urls import path
from . import views

urlpatterns = [
    path("", views.OrgVisitorListView.as_view(), name="visitor-list", ),
    path("report/org", views.ReportOrgVisitorListView.as_view(), name="visitor-list", ),

    path("<int:pk>/history/", views.VisitorHistoryListView.as_view(), name="visitor-history-list", ),
    path("<int:pk>", views.SingleVisitorHistory.as_view(), name="single-visitor-history", ),

    path("<int:pk>/history/person/report", views.ReportVisitorHistoryListView.as_view(), name="visitor-history-list", ),

    path("<int:pk>/verify-kyc/", views.VisitorKYCVerifyView.as_view(), name="visitor-history-list", ),
    path("<int:pk>/kyc/", views.VisitorKYCListView.as_view(), name="visitor-kyc-list", ),
    path("<int:pk>/kyc", views.VisitorKYCUpdateView.as_view(), name="visitor-kyc-list-update", ),

    path(
        'message/create',
        views.CreateVisitorsMessageAPI.as_view(),
        name='create_visitors_message'
    ),
    path(
        'message/list',
        views.ListVisitorsMessageAPI.as_view(),
        name='list_visitors_messages'
    ),

]
