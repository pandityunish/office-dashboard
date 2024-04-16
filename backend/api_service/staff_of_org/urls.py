from django.urls import path
from .views import StaffUserViewSet, StaffUserViewSet, StaffUserLoginView, StaffUserUpdateView

urlpatterns = [
    path('staffusers/', StaffUserViewSet.as_view({'get': 'list', 'post': 'create'}), name='staffuser-list-create'),
    path('staffusers/<int:pk>/',
         StaffUserViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}),
         name='staffuser-detail'),
    path('api/login/', StaffUserLoginView.as_view(), name='staffuser-login'),
    path('api/update_staff_data/<int:pk>/', StaffUserUpdateView.as_view(), name='staffuser-update'),
]
