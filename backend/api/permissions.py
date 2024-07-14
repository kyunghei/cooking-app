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
