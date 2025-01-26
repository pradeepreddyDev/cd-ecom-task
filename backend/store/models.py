from django.db import models
from django.contrib.auth.models import User


def default_colors():
    return ["#ff0000", "#000000", "#CDD0D0"]


class Product(models.Model):
    sku = models.CharField(max_length=50, unique=True)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=50)
    featured = models.BooleanField(default=False)
    stock = models.PositiveIntegerField(default=0)
    reviews = models.PositiveIntegerField(default=0)
    stars = models.FloatField(default=0.0)
    colors = models.JSONField(default=default_colors)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.product_name


class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')

    def __str__(self):
        return f"Image for {self.product.product_name}"

