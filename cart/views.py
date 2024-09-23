from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Cart, CartItem
from .serializers import CartItemSerializer, CartSerializer
from shop.models import Item

class CartView(APIView):
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, item_id):
        user = request.user
        item = get_object_or_404(Item, id=item_id)

        # Check if user has a cart, create one if not
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if the item is already in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, item=item)
        if not created:
            cart_item.quantity += 1  # Increase quantity if item already exists in cart
            cart_item.save()

        return Response({'message': 'Item added to cart!'}, status=status.HTTP_200_OK)
    
    def delete(self, request, item_id):
        try:
            cart = Cart.objects.get(user=request.user)
            cart_item = CartItem.objects.get(cart=cart, item_id=item_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart"}, status=status.HTTP_200_OK)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)
        except Cart.DoesNotExist:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def increase_cartitem_quantity(request):
    try:
        cart = Cart.objects.get(user=request.user)
        item_id = request.data.get('item_id')
        cart_item = CartItem.objects.get(cart=cart, item_id=item_id)
        cart_item.quantity += 1
        cart_item.save()
        return Response({"message": "Item quantity increased", "quantity": cart_item.quantity}, status=status.HTTP_200_OK)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def decrease_cartitem_quantity(request, item_id):
    try:
        cart = Cart.objects.get(user=request.user)
        cart_item = CartItem.objects.get(cart=cart, item_id=item_id)

        if cart_item.quantity > 1:
            cart_item.quantity -= 1
            cart_item.save()
            return Response({"message": "Item quantity decreased", "quantity": cart_item.quantity}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Item quantity cannot be less than 1"}, status=status.HTTP_400_BAD_REQUEST)
    except CartItem.DoesNotExist:
        return Response({"error": "Item not in cart"}, status=status.HTTP_404_NOT_FOUND)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
