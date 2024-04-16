from django.urls import path

from . import views

from .views import PurposeViewSet

from .views import OrganizationKYCViewSet, OrganizationContentAPIView

from .views import AdsBannerListAPIView, AdsBannerDetailAPIView

organizationkyc_list = OrganizationKYCViewSet.as_view({'get': 'list', 'post': 'create'})
organizationkyc_detail = OrganizationKYCViewSet.as_view({'put': 'update'})

urlpatterns = [

    path("list/", views.OrganizationsList.as_view(), name="organization-list"),
    path("create/", views.OrganizationCreate.as_view(), name="organization-create"),

    path("<int:pk>", views.OrganizationGet.as_view(), name="organization-create"),
    path("verify-otp/", views.OrganizationOTPVerify.as_view(), name="organization-verify"),
    path("verify-kyc/", views.OrganizationKYCVerify.as_view(), name="organization-kyc-create"),
    path("kyc/<int:pk>/", views.OrganizationKYCDetail.as_view(), name="organization-kyc-detail"),
    path("kyc/me/", views.MYOrganizationKYCDetail.as_view(), name="organization-kyc-detail"),

    path("branches/", views.BranchList.as_view(), name="branch-list"),
    path("branches/me", views.LoggedInOrganizationBranchList.as_view(), name="loggedin-organization-branch-list"),
    path("branches/<int:pk>/", views.BranchDetail.as_view(), name="branch-detail"),

    path("social-media-links/", views.SocialMediaLinkList.as_view(), name="socialmedia-link-list"),
    path("social-media-links/<int:pk>/", views.SocialMediaLinkDetail.as_view(), name="socialmedia-link-detail"),
    path("documents/", views.DocumentList.as_view(), name="document-list"),
    path("documents/<int:pk>/", views.DocumentDetail.as_view(), name="document-detail"),
    path("create-qr/", views.create_org_qr, name="create-org-qr"),

    path("<int:organization_id>/scan-organization",
         views.ScanOrganizationView.as_view(),
         name="scan-organization"
         ),
    path(
        '<int:organization_id>/manual-entry',
        views.ManualEntryVisitorView.as_view(),
        name="manual-entry-of-organization"
    ),

    path(
        '<int:organization_id>/visitor-count',
        views.OrganizationHistoryVisitorCountView.as_view(),
        name="organization-history-visitor-count"
    ),

    path("manual-entry-visitors-first-step/", views.manualEntryVisitorsFirstStep.as_view(),
         name="manual-entry-visitors-first-step"),
    path("manual-entry-visitors-second-step/", views.manualEntryVisitorsSecondStep.as_view(),
         name="manual-entry-visitors-second-step"),

    path("approve-visitor/", views.ApproveVisitorView.as_view(), name="approve-visitor"),
    path("<int:pk>/visit-history/", views.OrganizationVisitHistoryListView.as_view(),
         name="organization-visit-history"),
    path("<int:organization_id>/settings", views.OrganizationSettingsView.as_view(), name="organization-settings"),

    path("organization-list-name", views.OrganizationNameListView.as_view()),

    path("report-of-org/<int:organization_id>/", views.OrganizationVisitStatisticsView.as_view()),

    path('organizationkyc/', organizationkyc_list, name='organizationkyc-list'),
    path('organizationkyc/<int:pk>/', organizationkyc_detail, name='organizationkyc-detail'),

    path('devices/', views.device_list_view, name='device-list-create'),

    path('purpose/', PurposeViewSet.as_view({'get': 'list'}), name='purpose-list'),

    path('organization-content/', OrganizationContentAPIView.as_view(), name='organization-content-api'),

    path('ads-banners/list', views.AdsBannerListAPIView.as_view(), name='ads-banner-list'),
    path('ads-banners/create', views.AdsBannerCreateAPIView.as_view(), name='ads-banner-list'),
    path('ads-banners/<int:pk>/', AdsBannerDetailAPIView.as_view(), name='ads-banner-detail'),

    path(
        '<int:organization_id>/kyc/list',
        views.ListKYCView.as_view(),
        name='list-kyc'
    ),
    path(
        '<int:organization_id>/branches/download-excel',
        views.DownloadBranchExcelView.as_view(),
        name='download'
    ),
    path(
        '<int:organization_id>/branches/create',
        views.CreateOrganizationBranchView.as_view(),
        name='create_organization_branches'
    ),
    path(
        '<int:organization_id>/branches/list',
        views.ListOrganizationBranchView.as_view(),
        name='list_organization_branches'
    ),
    path(
        '<int:organization_kyc_id>/logo/update',
        views.UpdateOrganizationKYCLogoView.as_view(),
        name='update_organization_logo'
    ),
    path(
        '<int:organization_id>/organization-kyc/create',
        views.CreateOrganizationKYCView.as_view(),
        name='create_organization_kyc'
    ),
    path(
        '<int:organization_id>/organization-kyc/list',
        views.OrganizationKYCListView.as_view(),
        name='list_organization_kyc'
    ),
    path(
        'kyc/<int:organization_kyc_id>/detail',
        views.OrganizationKYCDetailView.as_view(),
        name='organization_kyc_details'
    ),
    path(
        '<int:organization_id>/visitor-history/download',
        views.DownloadVisitHistoryCSV.as_view(),
        name='organization_visitor_details'
    ),
    path(
        'visit/list',
        views.ListVisitorDataView.as_view(),
        name='organization_visit_list'
    ),
    path(
        'visitor-history/<int:visitor_history_id>/delete',
        views.DeleteVisitorHistoryView.as_view(),
        name='delete_visitor_history'
    ),
    path(
        'visitor-history/<int:visitor_history_id>/pdf/download',
        views.DownloadVisitHistoryPdfView.as_view(),
        name='download_visitor_history_pdf'
    ),
    path(
        'branch/<int:branch_id>/pdf/download',
        views.DownloadBranchPdfView.as_view(),
        name='download_branch_pdf'
    ),
    path(
        'organization/<int:organization_id>/list/waiting-visitors',
        views.ListWaitingVisitorsView.as_view(),
        name='list-waiting-visitor'
    ),


]

# urlpatterns = [
#     path("list/", views.OrganizationsList.as_view(), name="organization-list"),
#     path("create/", views.OrganizationCreate.as_view(), name="organization-create"),
#     path("<int:pk>", views.OrganizationGet.as_view(), name="organization-create"),
#     path(
#         "verify-otp/",
#         views.OrganizationOTPVerify.as_view(),
#         name="organization-verify",
#     ),
#     path(
#         "verify-kyc/",
#         views.OrganizationKYCVerify.as_view(),
#         name="organization-kyc-create",
#     ),
#     path(
#         "kyc/<int:pk>/",
#         views.OrganizationKYCDetail.as_view(),
#         name="organization-kyc-detail",
#     ),
#     path(
#         "kyc/me/",
#         views.MYOrganizationKYCDetail.as_view(),
#         name="organization-kyc-detail",
#     ),
#     path("branches/", views.BranchList.as_view(), name="branch-list"),
#     path(
#         "branches/me",
#         views.LoggedInOrganizationBranchList.as_view(),
#         name="loggedin-organization-branch-list",
#     ),
#     path("branches/<int:pk>/", views.BranchDetail.as_view(), name="branch-detail"),
#     path(
#         "social-media-links/",
#         views.SocialMediaLinkList.as_view(),
#         name="socialmedia-link-list",
#     ),
#     path(
#         "social-media-links/<int:pk>/",
#         views.SocialMediaLinkDetail.as_view(),
#         name="socialmedia-link-detail",
#     ),
#     path("documents/", views.DocumentList.as_view(), name="document-list"),
#     path("documents/<int:pk>/", views.DocumentDetail.as_view(), name="document-detail"),
#     path("create-qr/", views.create_org_qr, name="create-org-qr"),
#     path("scan-organization/", views.ScanOrg.as_view(), name="scan-organization"),
#     path("approve-visitor/",views.ApproveVisitorView.as_view(),name="approve-visitor",),
#     path(
#         "<int:pk>/visit-history/",
#         views.OrganizationVisitHistoryListView.as_view(),
#         name="organization-visit-history",
#     ),
#     path(
#         "settings/",
#         views.OrganizationSettingsView.as_view(),
#         name="organization-settings",
#     ),
#     path("organization-list-name", views.OrganizationNameListView.as_view())
# ]
