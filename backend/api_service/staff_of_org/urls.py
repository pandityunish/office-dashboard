from django.urls import path
from .views import StaffUserViewSet, StaffUserViewSet, BranchAndStaffLoginView

urlpatterns = [
    path('staffusers/', StaffUserViewSet.as_view({'get': 'list', 'post': 'create'}), name='staffuser-create'),
    path('staffusers/<int:pk>/',
         StaffUserViewSet.as_view({'get': 'retrieve', 'patch': 'partial_update', 'delete': 'destroy'}),
         name='staffuser-detail'),
    path('staffbranch/login/', BranchAndStaffLoginView.as_view(), name='staff-branch-user-login'),
]