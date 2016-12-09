from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=500)

class Meal(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    ingredients = models.ManyToManyField(Ingredient)

class MealHistory(models.Model):
    meal = models.ForeignKey(Meal)
    date = models.DateField()
    comments = models.CharField(max_length=1000)
