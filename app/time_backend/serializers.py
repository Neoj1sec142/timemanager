from rest_framework import serializers
from .models import StartTime, EndTime, BreakTime, DailyTime

class StartTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StartTime
        fields = '__all__'

class EndTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EndTime
        fields = '__all__'

class BreakTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BreakTime
        fields = '__all__'

class DailyTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyTime
        fields = '__all__'
