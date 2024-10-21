from rest_framework import serializers

from .models import Cart, CartItem
from user.serializers import UserSerializer
from shop.serializers import ItemSerializer

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
