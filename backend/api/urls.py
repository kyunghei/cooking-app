from django.urls import path  # type: ignore
from .views import (
    RegisterAPI, CuisineListCreateView,
    RecipeListCreateView, RecipeDetailView, LoginAPI, MyRecipesAPI
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static

# The API URLs are now determined automatically by the router
urlpatterns = [
    path("auth/register/", RegisterAPI.as_view(), name='register'),
    path("auth/login/", LoginAPI.as_view(), name='login'),
    path('cuisines/', CuisineListCreateView.as_view(),
         name='cuisine-list-create'),
    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('my-recipes/', MyRecipesAPI.as_view(), name='my-recipes'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
