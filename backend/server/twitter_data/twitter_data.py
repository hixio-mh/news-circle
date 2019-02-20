import requests
from requests_oauthlib import OAuth1Session,OAuth1
# from requests_oauthlib import OAuth2Session as oauth
import json
import secrets



oauth = OAuth1(client_key=secrets.CONSUMER_KEY,
                          client_secret=secrets.CONSUMER_SECRET,
                          resource_owner_key=secrets.ACCESS_TOKEN,
                          resource_owner_secret=secrets.ACCESS_SECRET)

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
    for tweet in tweets[:10]:
        urls = tweet["entities"]['urls']
        user = tweet["user"]['name']
        print(user,urls)



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