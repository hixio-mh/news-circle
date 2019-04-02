from django.db import models

class News(models.Model):
    news_id = models.AutoField(primary_key = True)
    news_title = models.TextField(null = False)
    news_author = models.TextField(max_length = 255)
    news_url = models.TextField(null = True)
    news_source = models.TextField(null = True)
    news_content = models.TextField(null = True)

    class Meta:
        managed = True
        db_table = 'news'
        app_label = 'rest'
        
    def __str__(self):
        return self.news_content

class Group(models.Model):
    group_id = models.AutoField(primary_key = True)
    group_name = models.TextField(null = False, max_length = 255)
    group_description = models.TextField(null = True)
    news_group = models.ManyToManyField(News, through='NewsGroup')

    class Meta:
        managed = True
        db_table = 'group'

    def __str__(self):
        return self.group_name


class User(models.Model):
    user_id = models.AutoField(primary_key = True)
    user_name = models.TextField(null = False, max_length = 100, unique = True)
    user_key = models.TextField(null = False, max_length = 100)
    user_email = models.EmailField(max_length=254, blank=False, unique=True, error_messages={'required': 'Please provide your email address.','unique': 'An account with this email exist.'})
    user_group = models.ManyToManyField(Group, through='UserGroup')
    
    class Meta:
        managed = True
        db_table = 'user'

    def __str__(self):
        return self.user_name

class UserGroup(models.Model):
    user_group_id = models.AutoField(primary_key = True)
    user = models.ForeignKey('User', models.CASCADE, blank=True, null=True)
    group = models.ForeignKey('Group', models.CASCADE, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'user_group'

class Invitation(models.Model):
    invitation_id = models.AutoField(primary_key = True)
    sender = models.ForeignKey('User', models.CASCADE, blank=True, null=True, related_name="sender")
    receiver = models.ForeignKey('User', models.CASCADE, blank=True, null=True, related_name="receiver")
    group = models.ForeignKey('Group', models.CASCADE, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    status = models.TextField(null = False, max_length = 100, default = "pending")

    class Meta:
        managed = True
        db_table = 'invitation'

    def __str__(self):
        return str(self.timestamp)
 
class NewsGroup(models.Model):
    news_group_id = models.AutoField(primary_key = True)
    news = models.ForeignKey('News', models.CASCADE, null = False, related_name="news")
    group = models.ForeignKey('Group', models.CASCADE, null = False, related_name = "group")

    class Meta:
        managed = True
        db_table = 'newsgroup'

    def __str__(self):
        return str(self.news_group_id)