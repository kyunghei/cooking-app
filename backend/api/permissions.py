from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow owners of an object to edit or delete it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permission are allowed to any request
        if request.method in SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the reipe
        return obj.author == request.user


class IsAdminOrReadOnly(BasePermission):
    """
    Custom permission to only allow admins to edit and object, but allow 
    read-only access to everyone else.
    """

    def has_permission(self, request, view):
        # Allow read-only access for any request
        if request.method in SAFE_METHODS:
            return True
        # Allow write access only for admin users
        return request.user and request.user.is_staff
