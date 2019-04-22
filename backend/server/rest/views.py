from django.shortcuts import render
from rest_framework.decorators import api_view,detail_route
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *
from django.shortcuts import get_object_or_404


# Create your views here.
class NewsView(APIView):
    def get(self, request, pk = ''):
        """
        If not pk: return all news
        If pk: return news by group = pk
        """
        news = []
        print(pk)
        if pk == '':
            news = News.objects.all()
        else:
            group = Group.objects.get(pk = pk)
            news = group.news_group.all()

        serializer = NewsSerializer(news, many=True)
        return Response(serializer.data)

class GroupsView(APIView):
    def get(self, request, pk):
        # Return all groups(accepted) by user id 
        user_group = UserGroup.objects.filter(user = pk).filter(status="accept")
        groups = []
        for i in user_group:
            groups.append(i.group)       
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data)

class GroupView(APIView):
    def get(self, request, pk):
        group = get_object_or_404(Group, pk = pk)
        # users = group.user_set.all()
        # user_serializer = UserSerializer(users, many = True)
        group_serializer = GroupSerializer(group, many=False)

        content = {
            'group': group_serializer.data,
            # 'users': user_serializer.data
        }
        return Response(content)

    def post(self, request, pk):
        """
        Create a new group for user_id = pk
        """
        user = User.objects.get(pk = pk)
        group_serializer = GroupSerializer(data=request.data)

        user_group_serializer = UserGroupSerializer.create(user = user, group = request.data)
        instance = user_group_serializer
        if group_serializer.is_valid():
            user_group_serializer.save()
            gid = instance.group.group_id
            group_serializer.data['group_id'] = gid
            return Response({'data': group_serializer.data, 'group_id': gid}, status=status.HTTP_201_CREATED)
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
        if request.data['user_email'] in emails and serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)


class UserView(APIView):
     def get(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class UsersView(APIView):
    # TODO: filter out the accepted/pending users by groupId
    def get_queryset(self):
        queryset = User.objects.all()
        user_email = self.request.query_params.get('user_email', None)
        if user_email is not None:
            queryset = queryset.filter(user_email=user_email)
        return queryset

    def get(self, request):
        serializer = UserSerializer(self.get_queryset(), many=True)
        return Response(serializer.data)

class UserGroupView(APIView):
    queryset = UserGroup.objects.all()

    def get(self, request, pk):
        userGroup = self.queryset.filter(group=pk)
        userGroup_serializer = UserGroupStatusSerializer(userGroup, many = True)
        return Response(userGroup_serializer.data)

    def delete(self, request,*args, **kwargs):
        userId = self.request.query_params.get('user_id', None)
        groupId = self.request.query_params.get('group_id', None)
        userGroup = self.queryset.filter(group=groupId, user=userId)
        userGroup.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request,*args, **kwargs):
        userId = request.data["user_id"]
        user = User.objects.get(pk=userId)
        groupId = request.data["group_id"]
        group = Group.objects.get(pk=groupId)
        user_status = request.data['status']
        userGroup = UserGroup.objects.create(group=group,user=user,status=user_status)
        user_group_serializer = UserGroupSerializer(userGroup, data=request.data)
        if user_group_serializer.is_valid():
            user_group_serializer.save()
            return Response(user_group_serializer.data, status=status.HTTP_200_OK)
        return Response(user_group_serializer.data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)

    def put(self, request):
        userId = request.data["user_id"]
        groupId = request.data["group_id"]
        userGroup = UserGroup.objects.all().filter(user_id=userId).filter(group_id=groupId).first()
        serializer = UserGroupSerializer(userGroup, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class InvitationView(APIView):
    def get(self, request, pk):
        invitations = Invitation.objects.select_related('receiver').filter(receiver_id = pk)
        invitation_serializer = GetInvitationSerializer(invitations, many = True)
        return Response(invitation_serializer.data)
        
    def post(self, request):
        """
        Send a new invitation from sender to receiver
        """
        invitation_serializer = ChangeInvitationSerializer(data=request.data)
        if invitation_serializer.is_valid():
            invitation_serializer.save()
            return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)
        return Response(invitation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        """
        Update pending -> accept / reject
        """
        invitation = Invitation.objects.get(pk = pk)
        invitation_serializer = ChangeInvitationSerializer(invitation, data = request.data)
        if invitation_serializer.is_valid():
            invitation_serializer.save()
            return Response(invitation_serializer.data, status=status.HTTP_201_CREATED)
        return Response(invitation_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NewsGroupView(APIView):
    def get(self, request, **kwargs):
        """
        Get news by group id
        """
        try:
            group_pk = kwargs.get("group_pk")
            newsGroup = NewsGroup.objects.filter(group_id = group_pk)
            news = set()
            for item in newsGroup:
                news.add(item.news)
            news_serializer = NewsSerializer(list(news), many = True)
            return Response(news_serializer.data, status = status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({'ERROR':'BAD REQUEST'}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, **kwargs):
        """
        Create a news in group = group_pk
        """
        data = request.data

        try:
            for item in data:
                group_pk = item['group_id']
                poster_pk = item['user_id']
                news_pk = item['news_id']
                group = Group.objects.get(pk = group_pk)
                user = User.objects.get(pk = poster_pk)
                news = News.objects.get(pk = news_pk)
                news_group = NewsGroup.objects.create(news = news, group = group, poster = user)
                if news_group:
                    news_group.save()
            return Response({'MESSAGE': 'CREATED'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'ERROR':'BAD REQUEST'}, status=status.HTTP_400_BAD_REQUEST)

class ThankView(APIView):
    def get(self, request, pk):
        """
        Get all the thank got by user_id
        """
        tks = Thank.objects.get(thank_target = pk)
        thank_serializer = ThankSerializer(tks, many = True)
        return Response(thank_serializer.data)

    def post(self, request):
        """
        Thank thank_target from thank_origin
        """
        data = request.data
        thank_target_id = data['thank_target']
        thank_origin_id = data['thank_origin']
        group_id = data['group_id']
        user_id = data['user_id']
        news_id = data['news_id']
        news_group = NewsGroup.objects.filter(news = news_id, group = group_id, poster = user_id)
        pass
