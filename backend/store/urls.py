from django.urls import path
from .views import product_list, product_detail

urlpatterns = [
    path('products/', product_list, name='product-list'),  # List all products
    path('products/<int:pk>/', product_detail, name='product-detail'),  # Retrieve a single product
]