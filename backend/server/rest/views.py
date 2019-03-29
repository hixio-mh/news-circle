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
        users = group.user_set.all()
        user_serializer = UserSerializer(users, many = True)
        group_serializer = GroupSerializer(group, many=False)

        content = {
            'group': group_serializer.data,
            'users': user_serializer.data
        }
        return Response(content)

    def post(self, request, pk):
        """
        Create a new group for user_id = pk
        """
        user = User.objects.get(pk = pk)
        group_serializer = GroupSerializer(data=request.data)

        user_group_serializer = UserGroupSerializer.create(user = user, group = request.data)

        if group_serializer.is_valid():
            user_group_serializer.save()
            return Response(group_serializer.data, status=status.HTTP_201_CREATED)
        return Response(group_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # TODO: Avoid repeating user_group

    def put(self, request, pk):
        """
        Update group name and description of group = pk
        """
        group = Group.objects.get(pk = pk)
        serializer = GroupSerializer(group, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """
        Delete group of user = pk
        """
        group = Group.objects.get(pk = pk)
        group.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

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

class InvitationView(APIView):
    def get(self, request, pk):
        invitation = Invitation.objects.select_related('receiver').get(receiver_id = pk)
        invitation_serializer = InvitationSerializer(invitation, many = False)
        return Response(invitation_serializer.data)

    def post(self, request):
        """
        Send a new invitation from sender to receiver
        """
        invitation_serializer = InvitationSerializer(data = request.data)
        if invitation_serializer.is_valid():
            invitation_serializer.save()
            return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)
        return Response(invitation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """
        Update pending -> accept / reject
        """
        invitation = Invitation.objects.get(pk = pk)
        invitation_serializer = InvitationSerializer(invitation, data = request.data)
        if invitation_serializer.is_valid():
            invitation_serializer.save()
            return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)
        return Response(invitation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

