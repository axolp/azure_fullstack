from django.db import models
from django.contrib.auth.models import User


class Character(models.Model):
    character= models.TextField()
    pinyin= models.TextField()
    definition= models.TextField()

    def __str__(self):
        return self.character

