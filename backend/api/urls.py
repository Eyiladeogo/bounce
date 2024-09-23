from django.urls import path, include

from rest_framework.routers import DefaultRouter

from user.views import UserViewSet
from shop.views import ShopViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'shop', ShopViewSet, basename='shop')

urlpatterns = [
    path('', include(router.urls)),
]