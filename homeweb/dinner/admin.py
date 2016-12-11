from django.contrib import admin
from .models import Meal, Ingredient, MealHistory

admin.site.register(Meal)
admin.site.register(Ingredient)
admin.site.register(MealHistory)
