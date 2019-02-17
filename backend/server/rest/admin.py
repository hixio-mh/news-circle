from django.contrib import admin
import rest.models as models
# Register your models here.

@admin.register(models.News)
class NewsAdmin(admin.ModelAdmin):
	fields = ['news_title', 'news_content', 'news_author']
	list_display = ['news_title', 'news_content', 'news_author']
	ordering = ['news_title']