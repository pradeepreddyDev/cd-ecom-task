from django.contrib import admin
from .models import Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    fields = ('image',)
    extra = 1


class ProductAdmin(admin.ModelAdmin):
    list_display = ('sku', 'product_name', 'price', 'category', 'featured', 'stock', 'reviews', 'stars', 'created_by')
    list_filter = ('category', 'featured', 'stars')
    search_fields = ('sku', 'product_name', 'category')

    fieldsets = (
        (None, {
            'fields': ('sku', 'product_name', 'price', 'description', 'category', 'featured', 'stock', 'reviews', 'stars', 'colors', 'created_by')
        }),
    )

    inlines = [ProductImageInline]


admin.site.register(Product, ProductAdmin)
