from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CharacterSerializer


@api_view(['GET'])
def home(request):
    characters= Character.objects.all()
    serializer= CharacterSerializer(characters, many=True)
    return Response(serializer.data)

