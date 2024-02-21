from django.contrib import admin
from .models import DailyTime, StartTime, EndTime, BreakTime

admin.site.register(DailyTime)
admin.site.register(StartTime)
admin.site.register(EndTime)
admin.site.register(BreakTime)
