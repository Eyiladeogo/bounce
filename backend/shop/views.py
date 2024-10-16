from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Item
from saved_items.models  import SavedItem
from.serializers import ItemSerializer

class ShopViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ShopView(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)

        if request.user.is_authenticated:
            user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))

            for item in serializer.data:
                item['is_saved'] = item['id'] in user_saved_items

        return Response(serializer.data, status=status.HTTP_200_OK)

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '').strip()
        if query:
            items = Item.objects.filter(name__istartswith=query)
        else:
            items = Item.objects.all()

        serializer = ItemSerializer(items, many=True)
        
        if request.user.is_authenticated:
            user_saved_items = set(SavedItem.objects.filter(user=request.user).values_list('item_id', flat=True))
            for item in serializer.data:
                item['is_saved'] = item['id'] in user_saved_items

        
        return Response(serializer.data, status=status.HTTP_200_OK)
