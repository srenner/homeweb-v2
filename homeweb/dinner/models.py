from django.db import models

# Create your models here.

class Ingredient(models.Model):
    name = models.CharField(max_length=500)
    def __str__(self):
        return self.name

class Meal(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000, blank=True)
    ingredients = models.ManyToManyField(Ingredient)
    last_ate = models.DateField(null=True, blank=True)
    def __str__(self):
        return self.name

class MealHistory(models.Model):
    meal = models.ForeignKey(Meal)
    date = models.DateField()
    comments = models.CharField(max_length=1000)
    class Meta:
        verbose_name_plural = "Meal history"
