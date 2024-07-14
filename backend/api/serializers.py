from rest_framework import serializers
from .models import User, Cuisine, Ingredient, Recipe

# Serializer for the User model


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

# Serializer for the Cuisine model


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = '__all__'

# Serializer for the Ingredient model


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

# Serializer for the Recipe model


class RecipeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    cuisines = CuisineSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = '__all__'
