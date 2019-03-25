from django.db import models

class News(models.Model):
    news_id = models.AutoField(primary_key = True)
    news_title = models.TextField(null = False)
    news_description = models.TextField(null = True)
    news_author = models.TextField(max_length = 255)
    news_url = models.URLField(null = True)
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

    class Meta:
        managed = True
        db_table = 'group'

    def __str__(self):
        return self.group_name


class User(models.Model):
    user_id = models.AutoField(primary_key = True)
    user_name = models.TextField(null = False, max_length = 100)
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

class Contact(models.Model):
    contact_id = models.AutoField(primary_key = True)
    curuser_name = models.TextField(null = False, max_length = 100)
    curuser_email = models.TextField(null = False, max_length = 100)
    friend_name = models.TextField(null = False, max_length = 100)
    friend_email = models.TextField(null = False, max_length = 100)


    class Meta:
        managed = True
        db_table = 'contact'

    def __str__(self):
        return self.contact_id

# class Invitation(models.Model):
#     invitation_id = models.AutoField(primary_key = True)
#     inviter_id = models.ForeignKey('User', models.CASCADE, blank=True, null=True,related_name="inviter")
#     invitee_id = models.ForeignKey('User', models.CASCADE, blank=True, null=True,related_name="invitee")
#     invite_group_id = models.ForeignKey('Group', models.CASCADE, blank=True, null=True)
#     timestamp = models.TextField(null = False, max_length = 100)
#     status = models.TextField(null = False, max_length = 100)

#     class Meta:
#         managed = True
#         db_table = 'invitation'

#     def __str__(self):
#         return self.invitation_id


