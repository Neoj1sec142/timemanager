from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=75)
    date_created = models.DateTimeField(auto_now=True, null=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    def __str__(self):
        return self.title
    
class TimeStamp(models.Model):
    hours = models.IntegerField()
    minutes = models.IntegerField()
    seconds = models.IntegerField()
    msg = models.CharField(max_length=100, default="msg", blank=True, null=True)
    cat = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='ts')
    date_created = models.DateTimeField(auto_now=True, null=True, blank=True)
    date_modified = models.DateTimeField(auto_now=True, null=True, blank=True)
    def __str__(self):
        return self.msg
    