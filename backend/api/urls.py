from django.urls import path  # type: ignore
from .views import (
    RegisterAPI, CuisineListCreateView, IngredientListCreateView,
    RecipeListCreateView, RecipeDetailView
)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path("auth/register/", RegisterAPI.as_view(), name='register'),
    path('cuisines/', CuisineListCreateView.as_view(),
         name='cuisine-list-create'),
    path('ingredients/', IngredientListCreateView.as_view(),
         name='ingredient-list-create'),
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
]
