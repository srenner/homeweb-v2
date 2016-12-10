from rest_framework import serializers
from dinner.models import Meal, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields=('name',)

class MealSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)
    class Meta:
        model = Meal
        fields=('name', 'description', 'ingredients')
