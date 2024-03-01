from rest_framework.serializers import ModelSerializer

from .models import *

class CharacterSerializer(ModelSerializer):
    class Meta:
        model= Character
        fields= '__all__'

class FlashcardsSerializer(ModelSerializer):
    class Meta:
        model= Flashcard
        fields= '__all__'