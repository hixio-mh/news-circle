from rest_framework import serializers
from rest.models import *

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('news_id', 'news_title', 'news_content', 'news_author', 'news_url', 'news_source')