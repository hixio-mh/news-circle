import requests
from requests_oauthlib import OAuth1Session,OAuth1
# from requests_oauthlib import OAuth2Session as oauth
import json
import SECRETS


import os
import django
import logging

logger = logging.getLogger(__name__)

# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "settings")

# django.setup()

from news-circle import models


try:
    #make your API request here
    tweets = home_line_test()
    
    for tweet in tweets:
        news = News.objects.create()
        news.news_title = tweet["text"]
        news.news_content = tweet["text"]
        news_author = tweet["user"]['name']
        news.news_url = tweet["entities"]['urls']
        new.news_source ="twitter"
        
        news.save()
        print ("updated:"+news.news_id)
except:
    print ("could not save:"+news.news_id)
print ("Action complete!")

oauth = OAuth1(client_key=SECRETS.CONSUMER_KEY,
                          client_secret=SECRETS.CONSUMER_SECRET,
                          resource_owner_key=SECRETS.ACCESS_TOKEN,
                          resource_owner_secret=SECRETS.ACCESS_SECRET)

def get_home_line():
    homeline_url = 'https://api.twitter.com/1.1/statuses/home_timeline.json'

    request = oauth.get(homeline_url)
    rejson =json.loads(request.text)
    with open('home_data.json', 'w') as outfile:
        json.dump(rejson, outfile)

def home_line_test():
    test = open('home_data.json', 'r')
    contents = test.read()
    tweets = json.loads(contents)
    return tweets
    # for tweet in tweets[:10]:
    #     urls = tweet["entities"]['urls']
    #     user = tweet["user"]['name']
    #     print(user,urls)



# part2 user data 
def get_user_timeline(screen_name="nytimes"):
    user_url='https://api.twitter.com/1.1/statuses/user_timeline.json'
    params={}
    params["screen_name"]=screen_name
    response = requests.get(user_url,params,auth=oauth)
    userJson = json.loads(response.text)
    with open('user_data.json', 'w') as data:
            json.dump(userJson, data)

def user_timeline_test():
    test = open('user_data.json', 'r')
    contents = test.read()
    tweets = json.loads(contents)
    for tweet in tweets[:10]:
        text = tweet["text"]
        url = tweet['entities']['urls']
        print(text,url)
    test.close()

#part3 user contacts
def get_friend_list():
    friend_url = 'https://api.twitter.com/1.1/friends/list.json'
    response = oauth.get(friend_url)
    friendJson = json.loads(response.text)
    with open('friend_list.json', 'w') as data:
            json.dump(friendJson, data)

get_user_timeline()
