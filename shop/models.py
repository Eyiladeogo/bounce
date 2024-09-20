from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    display_pic = models.ImageField(upload_to='item_pics/')

    def __str__(self):
        return self.name
