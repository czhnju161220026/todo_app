from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ToDoSerializers
from .models import ToDo
# Create your views here.

# ModelViewSet提供了默认的增删改查方法，如果有需求，可以自行更改
class ToDoView(viewsets.ModelViewSet):
    serializer_class = ToDoSerializers
    queryset = ToDo.objects.all()
    # 我可以在这里编写自己的api
    # 通过装饰器将它注册为Restful api
    # 返回Response(json格式数据)
    # 数据来源应该不限于数据库，我可以调用k8s api抓取数据返回

