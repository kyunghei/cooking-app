from rest_framework import generics, filters, permissions  # type: ignore
from .models import User, Cuisine, Ingredient, Recipe
from .serializers import (
    UserSerializer, CuisineSerializer, IngredientSerializer, RecipeSerializer
)
from .permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore


class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_class = [permissions.AllowAny]


# class UserViewSet(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer
#     filter_backends = [DjangoFilterBackend, filters.SearchFilter]
#     search_fields = ['username']


class CuisineListCreateView(generics.ListCreateAPIView):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_class = [IsAdminOrReadOnly]


class IngredientListCreateView(generics.ListCreateAPIView):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer
    permission_class = [IsAdminOrReadOnly]


class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    # permission_class = [IsOwnerOrReadOnly]
    permission_class = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['author', 'cuisines']
    search_fields = ['title', 'cuisine', 'ingredients']
    ordering_fields = ['created_at', 'updated_at']


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_class = [IsOwnerOrReadOnly]
