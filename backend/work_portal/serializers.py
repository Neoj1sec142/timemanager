from rest_framework import serializers
from .models import ClockedTime, Reminder, MonthlyCheck

class ClockedTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClockedTime
        fields = '__all__'
        
class ReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = '__all__'

class MonthlyCheckSerializer(serializers.ModelSerializer):
    class Meta:
        model = MonthlyCheck
        fields = '__all__'