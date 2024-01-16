from .serializers import *
from django.urls import path
from .views import *


urlpatterns = [
    path('clock/', ClockedTimeList.as_view(), name='clocked-time-list'),
    path('clock/<int:pk>/', ClockedTimeDetail.as_view(), name='clocked-time-detail'),
    path('reminders/', ReminderList.as_view(), name='reminder-list'),
    path('reminders/<int:pk>/', ReminderDetail.as_view(), name='reminder-detail'),
    path('payments/', MonthlyCheckList.as_view(), name='monthly-check-list'),
    path('payments/<int:pk>/', MonthlyCheckDetail.as_view(), name='monthly-check-detail')
]