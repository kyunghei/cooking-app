from django.db import models  # type: ignore
from django.contrib.auth.models import User
from django.conf import settings
from django.core.files import File
import os


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
    cuisine = models.ForeignKey(
        Cuisine, on_delete=models.SET_NULL, null=True, blank=True, related_name='recipes'
    )
    instruction = models.TextField()
    prep_time = models.IntegerField(help_text="Prep time in minutes")
    cook_time = models.IntegerField(help_text="Cooking time in minutes")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    serving_size = models.IntegerField()
    image = models.ImageField(
        upload_to='recipe_images/', blank=True, null=True, default='recipe_images/default-image.png')

    def save(self, *args, **kwargs):
        # If no image is uploaded, assign the default image.
        if not self.image:
            # Construct the full path to the default image.
            default_img_path = os.path.join(
                settings.MEDIA_ROOT, 'recipes_images', 'default-image.png')
            if os.path.exists(default_img_path):
                with open(default_img_path, 'rb') as f:
                    # Save the default image file under the name "default-img.png".
                    # You can change this filename if desired.
                    self.image.save('default-img.png', File(f), save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
