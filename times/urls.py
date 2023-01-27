from .serializers import *
from django.urls import path
from .views import *


urlpatterns = [
    path('cat/', CategoryList.as_view()),
    path('cat/<int:pk>/', CategoryDetail.as_view()),
    path('ts/', TimeList.as_view()),
    path('ts/cat/<int:category_pk>', TimeByCategory.as_view()),
    path('ts/<int:pk>/', TimeDetail.as_view()),
]