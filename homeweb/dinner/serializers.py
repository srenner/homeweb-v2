from rest_framework import serializers
from dinner.models import Meal, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    #meal = serializers.RelatedField(source='meal.name', read_only=True)
    #meal_name = serializers.CharField(read_only=True, source="meal.name")
    class Meta:
        model = Ingredient
        fields=('id', 'name')

class MealSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, required=False, read_only=True)
    class Meta:
        model = Meal
        fields='__all__'

class MealNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meal
        