from django.db import models
from django.contrib.auth.models import User

# Cuisine model to classify recipes


class Cuisine(models.Model):
    name = models.CharField(max_length=100)
    # Optional description of the cuisine
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

# Ingredient model to list ingredients for recipes


class Ingredient(models.Model):
    name = models.CharField(max_length=100)  # Name of ingredient
    description = models.TextField(blank=True, null=True)

# Recipe model to store recipe details


class Recipe(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='recipes')
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')
    cuisines = models.ManyToManyField(Cuisine, related_name='recipes')
    instruction = models.TextField()
    prep_time = models.IntegerField(help_text="Prep time in minutes")
    cook_time = models.IntegerField(help_text="Cooking time in minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
