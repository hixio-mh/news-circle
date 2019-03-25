from rest_framework import serializers
from rest.models import *

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('news_id', 'news_title', 'news_content', 'news_author')


class UserGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGroup
        fields = ('user_group_id', 'user', 'group')


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

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('curuser_name', 'curuser_email', 'friend_name','friend_email')