from rest_framework import serializers  # type: ignore
from .models import Cuisine, Recipe
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model

User = get_user_model()  # Custom user model if needed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class CuisineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuisine
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    cuisine = CuisineSerializer(read_only=True)
    cuisine_id = serializers.PrimaryKeyRelatedField(
        queryset=Cuisine.objects.all(),
        source='cuisine',  # This tells DRF to set the 'cuisine' field on the model
        write_only=True
    )

    class Meta:
        model = Recipe
        fields = '__all__'


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid Credentials")


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,

    )

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        value = value.lower()
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "An account with this email already exists.")
        return value

    def create(self, validated_data):
        validated_data['email'] = validated_data['email'].lower()
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
