from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ToDoSerializers
from .models import ToDo
# Create your views here.

# ModelViewSet提供了默认的增删改查方法，如果有需求，可以自行更改
class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializers
    queryset = ToDo.objects.all()
