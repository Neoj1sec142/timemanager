from django.db import models
from decimal import Decimal

class PlatformChoices(models.TextChoices):
    COREPOINT = 'Corepoint'
    ENVISIRAD = 'Envisirad'
    SSMS = 'Ssms'
    

class ClockedTime(models.Model):
    hours = models.IntegerField()
    minutes = models.IntegerField()
    clock_type = models.CharField(max_length=50, default="IN")
    created_on = models.DateField(auto_now_add=True)
    
class Reminder(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    platform = models.TextField(choices=PlatformChoices.choices, default=PlatformChoices.ENVISIRAD)
    created_on = models.DateField(auto_now_add=True)
    severity = models.IntegerField()
    remind_me = models.DateTimeField(null=True, blank=True)
    
class MonthlyCheck(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    taxes = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    payed_taxes = models.BooleanField(default=False)
    def save(self, *args, **kwargs):
        self.taxes = self.amount * Decimal('0.2')  # Calculate taxes as 20% of the amount
        super().save(*args, **kwargs)
    