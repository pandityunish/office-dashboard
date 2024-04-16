from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from .views import (
    ChangePasswordView,
    ForgotPasswordView,
    LoggedinUserDataView,
    LoginView,
    RegisterUserView,
    ResendOTPView,
    ResetPasswordView,
    UserListView,
    VerifyOTPView,
    GenerateTestQR,
    qr_code_view,
    get_all_permissions,
    AddStaffForORG,
    SubsOfOrg, UserUpdateView, UserImageUpdateView,
)

urlpatterns = [
    path('qr-code/<int:pk>/', qr_code_view, name='qr_code_view'),
    path("me/", LoggedinUserDataView.as_view(), name="get-logged-in-user"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("verify-otp/", VerifyOTPView.as_view(), name="verify-otp"),
    path("login/", LoginView.as_view(), name="login"),
    path("token-refresh/", TokenRefreshView.as_view(), name="login"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("resend-otp/", ResendOTPView.as_view(), name="resend-otp"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("", UserListView.as_view(), name="user-list"),

    path('get-all-permissions/', get_all_permissions, name='get_all_permissions'),
    path('add-staff-for-org/', AddStaffForORG, name='add-staff-for-org'),
    path('subscription-of-org/', SubsOfOrg, name='subscription-of-org'),
    path('<user_id>/update', UserUpdateView.as_view(), name='update_user_data'),
    path(
        '<user_id>/image-update',
        UserImageUpdateView.as_view(),
        name='update_user_image_data'
    ),
    path(
        'organization/<int:organization_id>/qr-code/download',
        views.DownloadOrganizationQRCodeView.as_view(),
        name='download_organization_qr_code'
    ),
    path(
        'visitor/<int:visitor_id>/qr-code/download',
        views.DownloadVisitorQRCodeView.as_view(),
        name='download_visitor_qr_code'
    ),
    path(
        'visitor/<int:visitor_id>/pdf/download',
        views.DownloadVisitorPDFView.as_view(),
        name='download_visitor_pdf'
    ),
    path(
        'visitor/<int:visitor_id>/delete',
        views.DeleteVisitorView.as_view(),
        name='delete_visitor'
    ),
    path(
        'visitor/all',
        views.ListALluser.as_view(),
        name='list_visitor'
    ),

]
