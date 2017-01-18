from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, generics
from dinner.models import Meal, Ingredient
from dinner.serializers import MealSerializer, MealNameSerializer, IngredientSerializer


#API ViewSets
class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all().order_by('name')
    serializer_class = MealSerializer


class UpdateName(generics.UpdateAPIView):
    queryset = Meal.objects.all()
    #serializer = MealNameSerializer(meal, data=request.data, partial=True)
    serializer_class = MealNameSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.name = request.data.get("name")
        instance.save()
        serializer = self.get_serializer(instance)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer






# Create your views here.
def index(request):
    return render(request, 'dinner/index.html', {})
