from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from dinner.models import Meal, Ingredient
from dinner.serializers import MealSerializer, IngredientSerializer


#API ViewSets
class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all().order_by('name')
    serializer_class = MealSerializer

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer
# Create your views here.
def index(request):
    return render(request, 'dinner/index.html', {})
