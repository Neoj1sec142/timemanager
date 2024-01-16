from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .models import ClockedTime, Reminder, MonthlyCheck
from .serializers import ClockedTimeSerializer, ReminderSerializer, MonthlyCheckSerializer

class ClockedTimeList(generics.ListCreateAPIView):
    queryset = ClockedTime.objects.all()
    serializer_class = ClockedTimeSerializer
    permission_classes = (permissions.AllowAny,)

class ClockedTimeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClockedTime.objects.all()
    serializer_class = ClockedTimeSerializer
    permission_classes = (permissions.AllowAny,)

class ReminderList(generics.ListCreateAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = (permissions.AllowAny,)

class ReminderDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer
    permission_classes = (permissions.AllowAny,)

class MonthlyCheckList(generics.ListCreateAPIView):
    queryset = MonthlyCheck.objects.all()
    serializer_class = MonthlyCheckSerializer
    permission_classes = (permissions.AllowAny,)

class MonthlyCheckDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MonthlyCheck.objects.all()
    serializer_class = MonthlyCheckSerializer
    permission_classes = (permissions.AllowAny,)
