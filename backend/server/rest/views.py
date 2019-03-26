from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404

# Create your views here.
class NewsView(APIView):
    def get(self, request):
        news = News.objects.all()
        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

class GroupsView(APIView):
    def get(self, request, pk):
        # Return all groups by user id
        user = User.objects.get(pk = pk)
        groups = user.user_group.all()
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class GroupView(APIView):
    def get(self, request, pk):
        group = get_object_or_404(Group, pk = pk)
        serializer = GroupSerializer(group, many=False)
        return Response(serializer.data)

    def post(self, request):
        # /?user=UID
        user = request.POST.get('user')
        serializer = UserGroupSerializer(data = request.data)
        if serializer.is_valid():
            serializer.create(user)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = UserSerializer(data = request.data)
        users = User.objects.all()
        emails = [user.user_email for user in users]
        print(request.data)
        if request.data['user_email'] in emails and serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

class UsersView(APIView):
    def get_queryset(self):
        queryset = User.objects.all()
        user_email = self.request.query_params.get('user_email', None)
        if user_email is not None:
            queryset = queryset.filter(user_email=user_email)
        return queryset

    def get(self, request):
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

class ContactView(APIView):
    def get_queryset(self):
        queryset = Contact.objects.all()
        user_email = self.request.query_params.get('curuser_email', None)
        if user_email is not None:
            queryset = queryset.filter(curuser_email=user_email)
        return queryset

    def get(self, request):
        serializer = ContactSerializer(self.get_queryset(),many=True)     
        return Response(serializer.data)
