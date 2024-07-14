from django.urls import path, include  # type: ignore
from rest_framework.routers import DefaultRouter  # type: ignore
from .views import (
    UserViewSet, CuisineViewSet, IngredientViewSet, RecipeViewSet
)

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'cuisines', CuisineViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'recipes', RecipeViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path("", include(router.urls))
]
