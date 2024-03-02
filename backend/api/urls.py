from django.urls import path
from .views import *

urlpatterns= [
    path('', home),
    path('register/', register),
    path('logowanie/', logowanie),
    path('addflashcard/', addFlashcard),
    path('getflashcards/', getFlashcards),
    path('changeInterval/', patchInterval),
]