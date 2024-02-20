from django.db import models

class Character(models.Model):
    character= models.TextField()
    pinyin= models.TextField()
    definition= models.TextField()

    def __str__(self):
        return self.character

