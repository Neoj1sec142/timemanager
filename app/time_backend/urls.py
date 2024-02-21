from django.urls import path
from .views import DailyTimeView, BreakTimeView, StartTimeView, EndTimeView

urlpatterns = [
    path('daily-time/', DailyTimeView.as_view(), name='daily_time'),
    path('break-time/', BreakTimeView.as_view(), name='break_time'),
    path('start-time/', StartTimeView.as_view(), name='start_time'),
    path('end-time/', EndTimeView.as_view(), name='end_time'),
]