from rest_framework import serializers

from .models import SavedItem
from backend.shop.serializers import ItemSerializer

class SavedItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    class Meta:
        model = SavedItem
        fields = ['item']
