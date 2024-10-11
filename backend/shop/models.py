from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=50)
    price = models.FloatField()
    image_url = models.URLField(max_length=500, null=True)
    # display_pic = models.ImageField(upload_to='item_pics/')

    def __str__(self):
        return self.name
