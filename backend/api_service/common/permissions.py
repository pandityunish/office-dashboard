from rest_framework.permissions import BasePermission


class IsVisitingUser(BasePermission):
    """
    Allows access only to visitor users.
    """
    message = 'Visitor User must be not be organization user.'

    def has_permission(self, request, view):
        return bool(
            request.user
            and
            request.user.is_authenticated
            and
            request.user.is_active
            and
            not request.user.is_organization
            and request.user.is_visitor
        )


class IsOrganizationUser(BasePermission):
    """
    Allows access only to Organization users.
    """
    message = 'User must be organization user.'

    def has_permission(self, request, view):
        return bool(
            request.user
            and
            request.user.is_authenticated
            and
            request.user.is_active
            and
            request.user.is_organization
            and not request.user.is_visitor
        )
