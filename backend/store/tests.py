from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import Product, ProductImage
from .serializers import ProductListSerializer, ProductSerializer

class ProductAPITestCase(TestCase):
    def setUp(self):
        # Create a user
        self.user = User.objects.create_user(username="testuser", password="password")

        # Create products
        self.product1 = Product.objects.create(
            sku="sku001",
            product_name="Product 1",
            price=100.00,
            description="Description of Product 1",
            created_by=self.user
        )
        self.product2 = Product.objects.create(
            sku="sku002",
            product_name="Product 2",
            price=200.00,
            description="Description of Product 2",
            created_by=self.user
        )

        # Create images for products
        self.image1 = ProductImage.objects.create(
            product=self.product1,
            image="path/to/image1.jpg"
        )
        self.image2 = ProductImage.objects.create(
            product=self.product2,
            image="path/to/image2.jpg"
        )

        self.client = APIClient()

    def test_product_list(self):
        response = self.client.get('/api/products/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        products = Product.objects.prefetch_related('images').all()
        serializer = ProductListSerializer(products, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_product_detail_valid(self):
        response = self.client.get(f'/api/products/{self.product1.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        product = Product.objects.get(pk=self.product1.id)
        serializer = ProductSerializer(product)
        self.assertEqual(response.data, serializer.data)

    def test_product_detail_invalid(self):
        response = self.client.get('/api/products/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
