from rest_framework import status, views
from rest_framework.response import Response
from .models import DailyTime, BreakTime, StartTime, EndTime
from .serializers import DailyTimeSerializer, BreakTimeSerializer, StartTimeSerializer, EndTimeSerializer
from django.db.models import Sum, F
from datetime import datetime, timedelta, timezone

class DailyTimeView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = DailyTimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        date = request.query_params.get('date')
        if date:
            date_format = '%Y-%m-%d'
            datetime_obj = datetime.strptime(date, date_format)
            next_day = datetime_obj + timedelta(days=1)
            daily_times = DailyTime.objects.filter(start_time__timestamp__date=datetime_obj.date())
            total_worked_time = sum([
                (daily_time.end_time.timestamp - daily_time.start_time.timestamp) - sum([
                    (break_time.out_stamp - break_time.in_stamp) for break_time in daily_time.breaks.all()
                ], timedelta()) for daily_time in daily_times
            ], timedelta())
            return Response({'total_worked_time': total_worked_time.total_seconds() / 3600}, status=status.HTTP_200_OK)
        return Response({'error': 'Date parameter is required.'}, status=status.HTTP_400_BAD_REQUEST)

class BreakTimeView(views.APIView):
    def post(self, request, *args, **kwargs):
        serializer = BreakTimeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StartTimeView(views.APIView):
    def post(self, request, *args, **kwargs):
        today_min = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_max = timezone.now().replace(hour=23, minute=59, second=59, microsecond=999999)
        
        if StartTime.objects.filter(timestamp__range=(today_min, today_max)).exists():
            return Response({"error": "Start time for today already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        start_time = StartTime.objects.create(timestamp=timezone.now())
        daily_time = DailyTime.objects.create(start_time=start_time, end_time=None, breaks=None)
        serializer = StartTimeSerializer(start_time)
        daily_time_ser = DailyTimeSerializer(daily_time)
        data = { 'start_time': serializer.data,
            'daily_time': daily_time_ser.data }
        return Response(data, status=status.HTTP_201_CREATED)

class EndTimeView(views.APIView):
    def post(self, request, *args, **kwargs):
        today_min = timezone.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_max = timezone.now().replace(hour=23, minute=59, second=59, microsecond=999999)
        
        if EndTime.objects.filter(timestamp__range=(today_min, today_max)).exists():
            return Response({"error": "End time for today already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        end_time = EndTime.objects.create(timestamp=timezone.now())
        daily_time = DailyTime.objects.create(start_time=start_time, end_time=None, breaks=None)
        serializer = EndTimeSerializer(end_time)
        return Response(serializer.data, status=status.HTTP_201_CREATED)