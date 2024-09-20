from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


urlpatterns = [
    path('search', SearchView.as_view(), name='shop-search'),
    path('', ShopView.as_view(), name='shop-landing')
]