from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from user.models import CustomUser


class StaffUserManager(BaseUserManager):

    def create_user(self, email, password=None, organization=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, organization=organization, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, organization=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, organization, **extra_fields)


ROLES = (
    ("admin", "Admin"),
    ("sub_admin", "Sub Admin"),
    ("account", "Account"),
    ("editor", "Editor"),
)


class StaffUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=50, blank=True, null=True)
    mobile_no = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    active = models.BooleanField(default=True)
    mobile_number = models.CharField(max_length=15, blank=True, null=True)
    organization = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="org_acc_roles", null=True)
    role = models.CharField(max_length=20, choices=ROLES, blank=True, null=True)

    objects = StaffUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['organization']

    groups = models.ManyToManyField(
        'auth.Group',
        blank=True,
        related_name="staff_user_groups",  # Provide a unique related_name
        related_query_name="group",
    )

    # Provide a unique related_name for the user_permissions field
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        blank=True,
        related_name="staff_user_user_permissions",  # Provide a unique related_name
        related_query_name="user_permission",
    )

    def __str__(self):
        return self.email

# User Full Name
# Address
# Mobile No.
# Email
# Role
# Active / Deactivate
# Action


# admin
# sub_admin
# account
# editor
