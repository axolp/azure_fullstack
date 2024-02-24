from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CharacterSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import  status



@api_view(['GET'])
def home(request):
    characters= Character.objects.all()
    serializer= CharacterSerializer(characters, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
def register(request):
    username= request.data['username']
    password= request.data['password']
    email= request.data['email']
    print(username, password, email)
    print("czy istnieje: ", User.objects.filter(username=username))
    if User.objects.filter(username=username).exists():
        print("jestem tutaj")
        return Response({"message": "Taki username już istnieje"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        new_user= User.objects.create_user(username=username, password= password, email=email)
        new_user.save()
        return Response({"message": "Stworzyłem uzytkownika"}, status= 201)

@api_view(['POST'])  
def logowanie(request):
    print("chce sie zalogowac", request.data)
    username= request.data['username']
    password= request.data['password']

    user= authenticate(username=username, password= password)

    if user != None:
        print("sukces")
        return Response({"message": "Zalogowano pomyslnie"}, status= 201)
    else:
        return Response({"message": "Coś poszło nie tak"}, status= 400)


    