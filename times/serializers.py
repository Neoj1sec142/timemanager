from rest_framework import serializers
from .models import TimeStamp, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        ordering = ('-date_created')
        
class TimeSerializer(serializers.ModelSerializer):
    cat = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all()
    )
    class Meta:
        model = TimeStamp
        fields = '__all__'
        ordering = ('-date_created')