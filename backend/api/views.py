from rest_framework import viewsets  # type: ignore
from .models import User, Cuisine, Ingredient, Recipe
from .serializers import (
    UserSerializer, CuisineSerializer, IngredientSerializer, RecipeSerializer
)
from .permissions import IsOwnerOrReadOnly


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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
