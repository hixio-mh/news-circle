from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated
# Create your views here.
class NewsView(APIView):
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

class GroupsView(APIView):

    permission_classes = (IsAuthenticated,) 
    def get(self, request, pk):
        # Return all groups by user id
        user = User.objects.get(pk = pk);
        groups = user.group_set.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class GroupView(APIView):
    permission_classes = (IsAuthenticated,) 
    def get(self, request, pk):
        group = get_object_or_404(Group, pk = pk)
        serializer = GroupSerializer(group, many=False)
        return Response(serializer.data)