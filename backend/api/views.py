from rest_framework import generics, filters, permissions, status  # type: ignore
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Cuisine, Recipe
from django.contrib.auth import get_user_model
from .serializers import (
    LoginSerializer, RegisterSerializer, CuisineSerializer,
    RecipeSerializer
)
from .permissions import IsOwnerOrReadOnly, IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend  # type: ignore
from django.shortcuts import render
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from rest_framework.permissions import AllowAny

User = get_user_model()


def index(request):
    return render(request, 'index.html')


class RegisterAPI(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class CheckEmailAPIView(APIView):
    permission_classes = [AllowAny]  # Allow unauthenticated access

    def get(self, request, *args, **kwargs):
        # Retrieve the email from query parameters, strip spaces, and lowercase it
        email = request.query_params.get('email', '').strip().lower()
        exists = User.objects.filter(email=email).exists()
        # Return a JSON response indicating whether the email exists
        return Response({'exists': exists})


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
    filterset_fields = ['author', 'cuisine']
    search_fields = ['title', 'cuisine__name']
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
