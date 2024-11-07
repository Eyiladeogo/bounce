from rest_framework import serializers

from .models import Cart, CartItem
from backend.user.serializers import UserSerializer
from backend.shop.serializers import ItemSerializer

class CartItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    class Meta:
        model = CartItem
        fields = ['item', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Cart
        fields = ['user', 'items', 'created_at']
