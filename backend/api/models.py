from django.db import models  # type: ignore
from django.contrib.auth.models import User  # type: ignore


class Cuisine(models.Model):
    name = models.CharField(max_length=100)
    # Optional description of the cuisine
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    title = models.CharField(max_length=100)
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='recipes')
    ingredients = models.TextField()
    cuisines = models.ManyToManyField(Cuisine, related_name='recipes')
    instruction = models.TextField()
    prep_time = models.IntegerField(help_text="Prep time in minutes")
    cook_time = models.IntegerField(help_text="Cooking time in minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    serving_size = models.IntegerField()

    def __str__(self):
        return self.title
