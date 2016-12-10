from rest_framework import serializers
from dinner.models import Meal, Ingredient

class MealSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meal
        fields=('name', 'description')
