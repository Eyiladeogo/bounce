from django.db import models
from django.conf import settings

class SavedItem(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_items")
    item = models.ForeignKey('shop.Item', on_delete=models.CASCADE)

    class Meta:
        unique_together = ['user', 'item']

    def __str__(self) -> str:
        return f'{self.user} saved {self.item.name}'
