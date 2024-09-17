from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *


router = DefaultRouter()

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('register/', LoginView.as_view()),
    path('logout/', LoginView.as_view())
]