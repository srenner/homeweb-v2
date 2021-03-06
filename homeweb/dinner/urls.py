from django.conf.urls import url, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'meals', views.MealViewSet)
router.register(r'ingredients', views.IngredientViewSet)

urlpatterns = [
    url('^api/', include(router.urls)),
    url(r'^$', views.index, name='index')
]
