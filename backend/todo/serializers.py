from rest_framework import serializers
from .models import ToDo


class ToDoSerializers(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = ('id', 'title', 'content', 'pub_date', 'isDone')
