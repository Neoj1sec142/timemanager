from rest_framework import generics, permissions
from .models import Category, TimeStamp
from .serializers import CategorySerializer, TimeSerializer


class CategoryList(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
        
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)
    
class TimeList(generics.ListCreateAPIView):
    queryset = TimeStamp.objects.all()
    serializer_class = TimeSerializer
    permission_classes = (permissions.AllowAny,)
        
class TimeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeStamp.objects.all()
    serializer_class = TimeSerializer
    permission_classes = (permissions.AllowAny,)
    
class TimeByCategory(generics.ListAPIView):
    serializer_class = TimeStamp
    permission_classes = (permissions.AllowAny,)
    def get_queryset(self):
        cat = self.kwargs['category_pk']
        queryset = TimeStamp.objects.filter(cat=cat)
        return queryset