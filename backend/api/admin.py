from django.contrib import admin
from .models import Recipe, Ingredient, Cuisine

# Register your models here.

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Cuisine)
