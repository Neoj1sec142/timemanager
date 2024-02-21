from django.db import models

class StartTime(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)

class EndTime(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    
class BreakTime(models.Model):
    in_stamp = models.DateTimeField()
    out_stamp = models.DateTimeField()

class DailyTime(models.Model):
    start_time = models.ForeignKey(StartTime, on_delete=models.CASCADE)
    end_time = models.ForeignKey(EndTime, on_delete=models.CASCADE, blank=True, null=True)
    breaks = models.ManyToManyField(BreakTime, blank=True, null=True)