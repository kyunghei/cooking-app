from django.urls import path, re_path  # type: ignore
from .views import (
    RegisterAPI, CuisineListCreateView,
    RecipeListCreateView, RecipeDetailView, LoginAPI, MyRecipesAPI,
    RecipeUpdateDeleteView, CheckEmailAPIView
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView
)
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# The API URLs are now determined automatically by the router
urlpatterns = [
    path("auth/register/", RegisterAPI.as_view(), name='register'),
    path("auth/login/", LoginAPI.as_view(), name='login'),
    path("auth/check_email/", CheckEmailAPIView.as_view(), name='check-email'),

    path('cuisines/', CuisineListCreateView.as_view(),
         name='cuisine-list-create'),

    path('recipes/', RecipeListCreateView.as_view(), name='recipe-list-create'),
    path('recipes/<int:pk>/', RecipeDetailView.as_view(), name='recipe-detail'),
    path('my-recipes/', MyRecipesAPI.as_view(), name='my-recipes'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('recipes/<int:pk>/update/',
         RecipeUpdateDeleteView.as_view(), name='recipe-detail'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Catch-all route for frontend (React)
urlpatterns += [
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html'))
]
