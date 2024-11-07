from django.urls import path, include

from rest_framework.routers import DefaultRouter

from backend.user.views import UserViewSet
from backend.shop.views import ShopViewSet
from .views import check_email

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'shop', ShopViewSet, basename='shop')

urlpatterns = [
    path('', include(router.urls)),
    path('check-email', check_email)
]