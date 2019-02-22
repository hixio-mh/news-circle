from django.db import models

class News(models.Model):
    news_id = models.AutoField(primary_key = True)
    news_title = models.TextField(null = False)
    news_content = models.TextField(null = False)
    news_author = models.TextField(max_length = 255)
    news_url = models.TextField(null = True)

    class Meta:
        managed = True
        db_table = 'news'
        app_label = 'rest'
        
    def __str__(self):
        return self.news_content
