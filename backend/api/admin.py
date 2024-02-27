from django.contrib import admin
from .models import *
from django.contrib.auth.models import User

admin.site.register(Character)
admin.site.register(Videos)
admin.site.register(Flashcard)

# Register your models here.
