from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CharacterSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import  status
from api.commonFunctions.functions import anki, superMemo




@api_view(['GET'])
def getFlashcards(request):

    return Response("get Flashcards-test")

@api_view(['POST'])
def addFlashcard(request):
    user_id= request.data['user_id']

    text= request.data['content'].splitlines()
    yt_id= request.data['video_id']
    video= Videos.objects.get(yt_id= yt_id)
    definition= text[0]
    character= text[1]
    pinyin= text[2]

    video_time= request.data['current_time']
    print(definition, character, pinyin)

    new_flashcard = Flashcard(
        user_id= user_id,
        character=character,
        pin_yin=pinyin,
        definition=definition,
        video_id=video,  # Dostosuj zgodnie z potrzebami
        second_in_video=video_time,
        EF= 2.5,
        n= 0,
        interval= 0,
        # Uzupełnij pozostałe pola zgodnie z potrzebami
    )

    new_flashcard.save()
    return Response({"message": "Dodałem fiszke do twojej kolekcji!"}, status= 201)


@api_view(['GET'])
def home(request):
    characters= Character.objects.all()
    serializer= CharacterSerializer(characters, many=True)
    return Response(serializer.data)

@api_view(['POST'])
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
        return Response({"message": "Zalogowano pomyslnie", "user_id" : user.id}, status= 201)
    else:
        return Response({"message": "Coś poszło nie tak"}, status= 400)


    