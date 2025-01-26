from rest_framework import serializers
from .models import Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    file_name = serializers.ReadOnlyField(source='image.name')
    url = serializers.SerializerMethodField()

    class Meta:
        model = ProductImage
        fields = ['file_name', 'url']

    def get_url(self, obj):
        return obj.image.url


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField(source='product_name')
    created = serializers.ReadOnlyField(source='created_by.username')
    images = ProductImageSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'created',
            'price',
            'colors',
            'images',
            'description',
            'category',
            'featured',
            'stock',
            'reviews',
            'stars',
        ]




class ProductListSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    name = serializers.ReadOnlyField(source='product_name')
    company = serializers.ReadOnlyField(source='created_by.username')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'company',
            'price',
            'colors',
            'image',
            'description',
            'category',
            'featured',
        ]

    def get_image(self, obj):
        first_image = obj.images.first()
        return first_image.image.url if first_image else "https://via.placeholder.com/150"