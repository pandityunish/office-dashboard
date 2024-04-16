from django.contrib.auth.models import Group, Permission

# Create permission groups
admin_group = Group.objects.create(name="admin")
super_admin_group = Group.objects.create(name="super-admin")
organisation_group = Group.objects.create(name="organisation")
visitor_group = Group.objects.create(name="visitor")

# Assign permissions to groups
# Example: organisation group can have permissions to manage staff users
organisation_group.permissions.add(Permission.objects.get(codename="add_user"))
organisation_group.permissions.add(Permission.objects.get(codename="change_user"))
organisation_group.permissions.add(Permission.objects.get(codename="delete_user"))
