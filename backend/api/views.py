from rest_framework import generics, filters, permissions  # type: ignore
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, Cuisine, Recipe
from .serializers import (
    LoginSerializer, RegisterSerializer, CuisineSerializer,
    RecipeSerializer
)
from .permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore
from django.shortcuts import render
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q


def index(request):
    return render(request, 'index.html')


class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class LoginAPI(APIView):
    permission_classes = [permissions.AllowAny]
    # Handles POST requests to the login endpoint

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })


class MyRecipesAPI(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Recipe.objects.filter(author=self.request.user)


class CuisineListCreateView(generics.ListCreateAPIView):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer
    permission_classes = [IsAdminOrReadOnly]


class RecipeListCreateView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['author', 'cuisines']
    search_fields = ['title', 'cuisines__name']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        queryset = Recipe.objects.all()
        cuisine_name = self.request.query_params.get('cuisine_name', None)
        if cuisine_name:
            queryset = queryset.filter(cuisines__name__iexact=cuisine_name)
        return queryset

    def perform_create(self, serializer):
        if self.request.user.is_anonymous:
            raise PermissionDenied("You must be logged in to create a recipe.")
        serializer.save(author=self.request.user)

    def get_queryset(self):
        queryset = Recipe.objects.all()
        query = self.request.query_params.get('q')
        if query:
            queryset = queryset.filter(Q(title__icontains=query))
        return queryset


class RecipeUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]


class RecipeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        instance = self.get_object()
        # Keep the old image if a new one is not provided
        if 'image' not in self.request.data:
            serializer.save(image=instance.image)
        else:
            serializer.save()
