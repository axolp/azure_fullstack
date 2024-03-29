from django.db import models
from django.contrib.auth.models import User


class api_fiszka(models.Model):
    # Tutaj dodajesz pola dla swojego modelu, na przykład:
    pytanie = models.TextField(blank=True, null=True)
    odpowiedz = models.TextField(blank=True, null=True)
    test =models.TextField(blank=True, null=True)
    # Dodaj więcej pól zgodnie z potrzebami

    def __str__(self):
        return self.pytanie  # lub inna reprezentacja Twojego wyboru
class Fiszka(models.Model):
    # Tutaj dodajesz pola dla swojego modelu, na przykład:
    pytanie = models.TextField(blank=True, null=True)
    odpowiedz = models.TextField(blank=True, null=True)
    character= models.TextField()
    pinyin= models.TextField()
    definition= models.TextField()
    # Dodaj więcej pól zgodnie z potrzebami

    def __str__(self):
        return self.pytanie  # lub inna reprezentacja Twojego wyboru
class UserProgress(models.Model):
    up_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey('Videos', on_delete=models.CASCADE)
    progress = models.IntegerField()  # seconds of video

class Flashcard(models.Model):
    fiszka_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    character = models.CharField(max_length=50)
    pin_yin = models.CharField(max_length=50)
    definition = models.TextField()
    sentence = models.TextField(blank=True, null=True)
    video_id = models.ForeignKey('Videos', on_delete=models.CASCADE)
    second_in_video = models.IntegerField(blank=True, null=True)
    duration_time_in_video = models.IntegerField(blank=True, null=True)
    EF = models.FloatField()
    n = models.IntegerField()
    interval = models.TextField()
    last_display_date = models.DateTimeField(blank=True, null=True)
    next_display_date = models.DateTimeField(blank=True, null=True)

class Videos(models.Model):
    video_id = models.AutoField(primary_key=True)
    yt_id = models.CharField(max_length=50)
    title = models.CharField(max_length=100)
    description = models.TextField()
    transcript = models.TextField(blank=True, null=True)
    hsk_dict = models.TextField(blank=True, null=True)

class Character(models.Model):
    character= models.TextField()
    pinyin= models.TextField()
    definition= models.TextField()

    def __str__(self):
        return self.character
    




