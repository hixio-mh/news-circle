import json
import requests
import sys
import secrets
import psycopg2

KEY_G = secrets.KEY_G
PGDB_PW = secrets.PGDB_PW

#g article class
class Article_G(object):

	def __init__(self, article_dict={}):
		if 'publishedAt' in article_dict:
			self.pub_date = article_dict['publishedAt'][:10]
		else:
			self.pub_date = ''
		if 'title' in article_dict:
			self.title = article_dict['title']
			dash = self.title.find(" - ")
			self.title = self.title[:dash]
			self.title = self.title.replace(","," ")
		else:
			self.title = ''
		if 'content' in article_dict:
			self.abstract = article_dict['content']
		else:
			self.abstract = ''
		if 'author' in article_dict:
			self.author = str(article_dict['author']).replace(","," ")
		if 'url' in article_dict:
			self.url = article_dict['url']
		else:
			self.url = ''
		if 'source' in article_dict:
			self.source = article_dict['source']['name']
		else:
			self.url = 'No source provided'

	def db_row(self):
		return (self.title, self.abstract, self.author, self.url, self.source)

	def __str__(self):
		return "{}; by {}; {}; published {}".format(self.title, self.author, self.source, self.pub_date)

#Formatted list of Google News articles
def g_format(unique_id):
	g_articles = []
	#assembling list of Google News articles
	for item in CACHE_DICT[unique_id]['articles']:
		g_articles.append(Article_G(item))
	print("Google News article count " + str(len(g_articles)))
	return g_articles



#Caching and API request
CACHE_FILE_NAME = "gcache.json"

#Load the cache file into a python dictionary

try: 
	cache_file = open(CACHE_FILE_NAME, 'r')
	cache_str = cache_file.read()
	CACHE_DICT = json.loads(cache_str)
except:
	CACHE_DICT = {}

#Define the unique identifier function

def unique_id(baseurl, params_dict, private_keys):
	sorted_keys = sorted(params_dict.keys())
	result = []
	for item in sorted_keys:
		if item not in private_keys:
			result.append("{}-{}".format(item,params_dict[item]))
	return baseurl + "_".join(result)

#API request
def get_g_data(page=0):
	#data request components
	baseurl = "https://newsapi.org/v2/top-headlines"
	params_dict = {
		'country' : 'us',  
		'apiKey': KEY_G
	}
	#build unique identifier
	unique_ident_g = unique_id(baseurl, params_dict,['apiKey'])
	#Pull data from cache if it's in there
	if unique_ident_g in CACHE_DICT:
		print("Getting cached data from Google News")
		return g_format(unique_ident_g)
	#otherwise request it from the g API	
	else:
		print("Requesting new data from Google News")
		g_resp = requests.get(baseurl,params_dict)
		print(g_resp.url)
		print("Google News request status:" + str(g_resp.status_code))
		#add response to the cache dictionary
		CACHE_DICT[unique_ident_g] = json.loads(g_resp.text)
		dumped_data = json.dumps(CACHE_DICT)
		cache_write_file = open(CACHE_FILE_NAME,'w')
		cache_write_file.write(dumped_data)
		cache_write_file.close()
		print("New Google News data written to cache")
		return g_format(unique_ident_g)

g = get_g_data()


test_g = g[0]

# print("full")
# print(test_g)

# print("title")
# print(test_g.title)
# print("date")
# print(test_g.pub_date)
# print("abstract")
# print(test_g.abstract)
# print("author")
# print(test_g.author)
# print("source")
# print(test_g.source)
# print("url")
# print(test_g.url)
# print("records")
# print(len(g))

#Populate PGDB with articles if it isn't already in there, data comes from cache

def update_pgdb(article_list): 
	conn = psycopg2.connect(host="localhost", database="newscircle", user="postgres", password=PGDB_PW)
	cur = conn.cursor()

	#Load data into pgdb
	for article in article_list:
		#Load in data, only if it doesn't already exist
		cur.execute("INSERT INTO news(news_title, news_content, news_author, news_url, news_source) VALUES(%s, %s, %s, %s, %s) ON CONFLICT DO NOTHING",article.db_row())

	conn.commit()

	#Cut source out of titles in db


	conn.close()
	#return output # for testing purposes

update_pgdb(g)