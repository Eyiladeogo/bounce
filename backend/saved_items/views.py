from django.shortcuts import render, get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from shop.models import Item

from .models import SavedItem
from .serializers import SavedItemSerializer
    
    
class SavedItemsView(APIView):
    def get(self, request):
        user = request.user
        saved_items = SavedItem.objects.filter(user=user).select_related('item')
        serializer = SavedItemSerializer(saved_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        user = request.user
        item_id = request.data.get('item_id')
        if not item_id:
            return Response({"error": "Item ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, id=item_id)

        saved_item, created = SavedItem.objects.get_or_create(user=user, item=item)
        if created:
            return Response({'message': 'Item saved for later!'}, status=status.HTTP_200_OK)
        else:
            saved_item.delete()
            return Response({'message': 'Item removed from saved items.'}, status=status.HTTP_200_OK)

    def delete(self, request):
        item_id = request.data.get('item_id')
        if not item_id:
            item_id = request.query_params.get('item_id')
        if not item_id:
            return Response({"error": "Item ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Item, id=item_id)
        
        try:
            saved_item = SavedItem.objects.get(user=request.user, item=item)
            saved_item.delete()
            return Response({"success": "Item removed from saved items"}, status=status.HTTP_200_OK)
        except SavedItem.DoesNotExist:
            return Response({"error": "Item is not in your saved items"}, status=status.HTTP_400_BAD_REQUEST)
