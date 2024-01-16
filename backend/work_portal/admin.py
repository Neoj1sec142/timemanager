from django.contrib import admin
from .models import ClockedTime, Reminder, MonthlyCheck

admin.site.register(ClockedTime)
admin.site.register(Reminder)
admin.site.register(MonthlyCheck)
