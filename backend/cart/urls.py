from django.urls import path, include
# from rest_framework.routers import DefaultRouter
from .views import *


urlpatterns = [
    path('', CartView.as_view(), name='cart'),
    path('increase/', increase_cartitem_quantity, name='increase-cartitem-quantity'),
    path('decrease/', decrease_cartitem_quantity, name='decrease-cartitem-quantity'),
    path('set/', set_cartitem_quantity, name='set-cartitem-quantity'),
    path('clear/', clear_cart, name='clear-cart')
]