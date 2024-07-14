from rest_framework import viewsets, filters  # type: ignore
from .models import User, Cuisine, Ingredient, Recipe
from .serializers import (
    UserSerializer, CuisineSerializer, IngredientSerializer, RecipeSerializer
)
from .permissions import IsOwnerOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ['username']


class CuisineViewSet(viewsets.ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer


class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_class = [IsOwnerOrReadOnly]
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['author', 'cuisines']
    search_fields = ['title', 'cuisine', 'ingredients']
    ordering_fields = ['created_at', 'updated_at']
