from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
class Event(models.Model):
    organizer = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # ✅ FIX

    name = models.CharField(max_length=200)
    description = models.TextField()
    venue = models.CharField(max_length=200, null=True)
    date = models.DateField(null=True)
    time = models.TimeField(null=True)

    total_seats = models.IntegerField()
    available_seats = models.IntegerField()

    price = models.FloatField(null=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    seats_booked = models.IntegerField()
    booking_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.event.name}"
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    image = models.ImageField(upload_to='profiles/', null=True, blank=True)

    def __str__(self):
        return self.user.username
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)