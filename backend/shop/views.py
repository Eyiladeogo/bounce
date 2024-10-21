from django.shortcuts import render
from django.db.models import Q

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Item
from saved_items.models  import SavedItem
from cart.models import Cart, CartItem
from.serializers import ItemSerializer

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ShopView(APIView):
    #Didnt help me get the quantity of the item if it exists in cart
    # def get(self, request):
    #     items = Item.objects.all()
    #     serializer = ItemSerializer(items, many=True)

    #     if request.user.is_authenticated:
    #         user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))
    #         cart = Cart.objects.get(user=request.user)
    #         # user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))
    #         user_cart_items = set(CartItem.objects.filter(cart=cart).values_list('item_id', flat=True))
    #         for item in user_cart_items:
    #             print(item)

    #         for item in serializer.data:
    #             item['is_saved'] = item['id'] in user_saved_items
    #             item['in_cart'] = item['id'] in user_cart_items

    #     return Response(serializer.data, status=status.HTTP_200_OK)

    # Helps me get the quantity
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)

        if request.user.is_authenticated:
            # Get user's saved items
            user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))

            # Get user's cart and cart items
            cart = Cart.objects.get(user=request.user)
            user_cart_items = CartItem.objects.filter(cart=cart)  # Get actual CartItem objects, not just ids

            # Create a dictionary to map item ids to their respective quantities
            user_cart_items_dict = {cart_item.item_id: cart_item.quantity for cart_item in user_cart_items}

            # Iterate through the serialized items and add 'is_saved', 'in_cart', and 'quantity'
            for item in serializer.data:
                item_id = item['id']
                item['is_saved'] = item_id in user_saved_items
                item['in_cart'] = item_id in user_cart_items_dict
                item['quantity'] = user_cart_items_dict.get(item_id, 1)  # Get quantity from cart, default to 1

        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if query:
            items = Item.objects.filter(Q(name__istartswith=query) | Q(name__icontains=query))
        else:
            items = Item.objects.all()

        serializer = ItemSerializer(items, many=True)

        if request.user.is_authenticated:
            user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))
            for item in serializer.data:
                item['is_saved'] = item['id'] in user_saved_items

        
        return Response(serializer.data, status=status.HTTP_200_OK)
