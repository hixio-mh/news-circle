from django.contrib import admin
import rest.models as models
# Register your models here.

@admin.register(models.News)
class NewsAdmin(admin.ModelAdmin):
	fields = ['news_title', 'news_content', 'news_author']
	list_display = ['news_title', 'news_content', 'news_author']
	ordering = ['news_title']

@admin.register(models.Group)
class GroupAdmin(admin.ModelAdmin):
	fields = ['group_name', 'group_description']
	list_display = ['group_name', 'group_description']
	ordering = ['group_name']

@admin.register(models.User)
class UserAdmin(admin.ModelAdmin):
	fields = ['user_name']
	list_display = ['user_name']
	ordering = ['user_name']

@admin.register(models.UserGroup)
class UserGroupAdmin(admin.ModelAdmin):
	fields = ['user', 'group']
	list_display = ['user', 'group']
	ordering = ['user']