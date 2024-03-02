from django.shortcuts import render
from django.http import HttpResponse
from .models import *
from .serializers import FlashcardsSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CharacterSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import  status
from api.commonFunctions.functions import anki, superMemo
import datetime
from django.utils import timezone


@api_view(['PATCH'])
def patchInterval(request):
    print("now: ",datetime.datetime.now())
    print("request data: ",request.data)
    fiszka_id= request.data['fiszka_id']
    user_grade= request.data['user_grade']

    flashcard= Flashcard.objects.get(fiszka_id=fiszka_id)
    print(flashcard.EF)
    new_n, new_EF, new_interval= superMemo(int(user_grade), int(flashcard.n), float(flashcard.EF), flashcard.interval)
    flashcard.n= new_n
    flashcard.interval= str(new_interval)
    flashcard.EF= new_EF
    flashcard.last_display_date= datetime.datetime.now()

    if new_interval == '10 minut' or new_interval == '15 minut':
        next_time_display= datetime.datetime.now() + datetime.timedelta(minutes=int(new_interval[:2]))
    else:
        next_time_display= datetime.datetime.now() + datetime.timedelta(days=int(new_interval))
    
    flashcard.next_display_date= next_time_display
    print("next display time: ", next_time_display)

    flashcard.save()
    print("nowe parametry: ", new_n, new_EF, new_interval)
    return Response("zmienilem trudnosc i interval fiszki")


@api_view(['POST'])
def getFlashcards(request):
    
    user_id= request.data['user_id']
    flashcards= Flashcard.objects.filter(user_id=user_id, next_display_date__lte = datetime.datetime.now())
    serializer= FlashcardsSerializer(flashcards, many=True)
  
    print(user_id)
    print("flashcards", flashcards)
    print("serializer: ", serializer)
    print(".data: ", serializer.data)
    return Response(serializer.data)

@api_view(['POST'])
def addFlashcard(request):
    print(request.data)
    user_id= request.data['user_id']

    text= request.data['content'].splitlines()
    yt_id= request.data['video_id']
    video= Videos.objects.get(yt_id= yt_id)
    definition= text[0]
    character= text[1]
    pinyin= text[2]
    video_time= request.data['current_time']
    durration= request.data['duration_time_in_video']
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
        duration_time_in_video= durration,
        next_display_date= datetime.datetime.now(),
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


    