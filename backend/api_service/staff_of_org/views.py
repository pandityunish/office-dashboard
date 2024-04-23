from django.contrib.auth.hashers import check_password, make_password
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError


from .models import StaffUser
from .serializers import StaffUserSerializer

from organization.models import OrganizationBranch
from user.models import CustomUser

# Staff and Branch login APIS
class BranchAndStaffLoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email", None)
        password = request.data.get("password", None)

        if email is None or password is None:
            raise ValidationError("Both email and password are required to log in.")

        user = OrganizationBranch.objects.filter(email=email).first()
        if user is None:
            
            user = StaffUser.objects.filter(email=email).first()

        if user is None:
            raise ValidationError("Invalid email or password.")

        if not check_password(password, user.password):
            raise ValidationError("Invalid email or password for Staff.")

        if not user.is_active:
            raise ValidationError("This user account is not active.")

        data = {}

        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token

        data["access_token"] = str(access_token)
        data["refresh_token"] = str(refresh)
        return Response(data, status=status.HTTP_200_OK)


# Staff(Subadmin) Get, create, update and delete APIS
class StaffUserViewSet(viewsets.ModelViewSet):
    queryset = StaffUser.objects.all()
    serializer_class = StaffUserSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        mutable_data = request.data.copy()
        mutable_data["organization"] = request.user.id
        raw_password = mutable_data.get("password", None)
        hashed_password = make_password(raw_password)
        mutable_data["password"] = hashed_password
        serializer = self.get_serializer(data=mutable_data)
        serializer.is_valid(raise_exception=True)

        custom_user = CustomUser.objects.create_user(
            mobile_number=mutable_data.get('mobile_number'),
            full_name=mutable_data.get('full_name'),
            email=mutable_data.get('email'),
            password=raw_password,
            organization_type=mutable_data.get('organization_type'),
            is_staff=True,
            is_active=True,
            is_sms_verified=True,
        )

        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        if instance.organization.id != request.user.id:
            return Response(
                {"message": "You are not authorized"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        raw_password = request.data.get("password", None)
        if raw_password:
            hashed_password = make_password(raw_password)
            request.data["password"] = hashed_password
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Staff deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )

    def get_queryset(self):
        search_term = self.request.query_params.get("search")
        if search_term:
            queryset = self.queryset.filter(
                Q(full_name__icontains=search_term)
                | Q(email__icontains=search_term)
                | Q(mobile_number__icontains=search_term)
                | Q(address__icontains=search_term)
                | Q(role__icontains=search_term)
            )
        else:
            queryset = self.queryset
        return queryset
