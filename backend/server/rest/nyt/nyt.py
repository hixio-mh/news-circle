import json
import requests
import sys
import secrets
import psycopg2

KEY_NYT = secrets.KEY_NYT
PGDB_PW = secrets.PGDB_PW

#NYT article class
class Article_NYT(object):

	def __init__(self, article_dict={}):
		if 'published_date' in article_dict:
			self.pub_date = article_dict['published_date'][:10]
		else:
			self.pub_date = ''
		if 'title' in article_dict:
			self.title = article_dict['title'].replace(","," ")
		else:
			self.title = ''
		if 'abstract' in article_dict:
			self.abstract = article_dict['abstract']
		else:
			self.abstract = ''
		if 'byline' in article_dict:
			self.author = str(article_dict['byline']).replace(","," ")
		if 'url' in article_dict:
			self.url = article_dict['url']
		else:
			self.url = ''
		self.source = "NYT"

	def db_row(self):
		return (self.title, self.abstract, self.author, self.url, self.source)

	def __str__(self):
		return "{}; by {}; New York Times; published {}".format(self.title, self.author, self.pub_date)

#Formatted list of NYT articles
def nyt_format(unique_id):
	nyt_articles = []
	#assembling list of NYT articles
	for item in CACHE_DICT[unique_id]['results']:
		nyt_articles.append(Article_NYT(item))
	print("NYT article count " + str(len(nyt_articles)))
	return nyt_articles



#Caching and API request
CACHE_FILE_NAME = "nyt.json"

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
def get_nyt_data(page=0):
	#data request components
	baseurl = "https://api.nytimes.com/svc/topstories/v2/home.json"
	params_dict = {
		'page' : page,  
		'api-key': KEY_NYT
	}
	#build unique identifier
	unique_ident_nyt = unique_id(baseurl, params_dict,['api-key'])
	#Pull data from cache if it's in there
	if unique_ident_nyt in CACHE_DICT:
		print("Getting cached data from NYT")
		return nyt_format(unique_ident_nyt)
	#otherwise request it from the NYT API	
	else:
		print("Requesting new data from NYT")
		nyt_resp = requests.get(baseurl,params_dict)
		print("NYT request status:" + str(nyt_resp.status_code))
		#add response to the cache dictionary
		CACHE_DICT[unique_ident_nyt] = json.loads(nyt_resp.text)
		dumped_data = json.dumps(CACHE_DICT)
		cache_write_file = open(CACHE_FILE_NAME,'w')
		cache_write_file.write(dumped_data)
		cache_write_file.close()
		print("New NYT data written to cache")
		return nyt_format(unique_ident_nyt)

nyt_1 = get_nyt_data(0)
nyt_2 = get_nyt_data(1)

nyt = nyt_1 + nyt_2

test_nyt = nyt[0]

print("full")
print(test_nyt)

print("title")
print(test_nyt.title)
print("date")
print(test_nyt.pub_date)
print("abstract")
print(test_nyt.abstract)
print("author")
print(test_nyt.author)
print("source")
print(test_nyt.source)
print("url")
print(test_nyt.url)
print("records")
print(len(nyt))

#Populate PGDB with articles if it isn't already in there, data comes from cache

def update_pgdb(article_list): 
	conn = psycopg2.connect(host="localhost", database="newscircle", user="postgres", password=PGDB_PW)
	cur = conn.cursor()

	for article in article_list:
		#Load in data, only if it doesn't already exist
		cur.execute("INSERT INTO news(news_id, news_title, news_content, news_author, news_url, news_source) VALUES(NULL, %s, %s, %s, %s, %s) ON CONFLICT DO NOTHING",article.db_row())

	conn.commit()
	conn.close()
	#return output # for testing purposes

update_pgdb(nyt)