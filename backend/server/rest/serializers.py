from rest_framework import serializers
from rest.models import *

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('news_id', 'news_title', 'news_content', 'news_author', 'news_url', 'news_source')



class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = ('user_group_id', 'user', 'group')

    def create(user, group):
        user = user
        group = Group.objects.create(group_name = group['group_name'], group_description = group['group_description'])
        userGroup = UserGroup.objects.create(
            user = user, group = group
        )
        return userGroup


class UserSerializer(serializers.ModelSerializer):
    user_group = UserGroupSerializer(
        many = True,
        read_only = True
    )

    class Meta:
        model = User
        fields = ('user_id', 'user_name', 'user_key', 'user_email', 'user_group')


class GroupSerializer(serializers.ModelSerializer):
    user_group = UserGroupSerializer(
        many = True,
        read_only = True
    )

    class Meta:
        model = Group
        fields = ('group_id', 'group_name', 'group_description', 'user_group')

class InvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ('invitation_id', 'sender', 'receiver', 'group', 'timestamp', 'status')