import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {HTTP} from '@ionic-native/http'
import OAuth from 'oauth-1.0a'
import CryptoJS from 'crypto-js/'
// import {request} from 'request'
// declare var require: any
// var request = require("request");

// var options = { method: 'GET',
//   url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
//   headers: 
//    { 'Postman-Token': 'f5b6d82c-eb8f-4c14-addb-5cd89ba65708',
//      'cache-control': 'no-cache',
//      Authorization: 'OAuth oauth_consumer_key="b4RmauUrY3VPxtJid4f0Q5BM3",oauth_token="959133594802409472-XPd71Ug4nbDR3m0bBOC8MT6b1iXSDZR",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1552867172",oauth_nonce="5iCIp6a8Xpn",oauth_version="1.0",oauth_signature="ThojDd1QK6zQCKC8UmihTePDKuo%3D"' } };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });

const APIKEY = environment.APIKEY;

const consumer = {
    key: 'b4RmauUrY3VPxtJid4f0Q5BM3',
    secret: 'Ue0iNQXEqGj3d9N2LHx8T4fJaLRBc2a63ItZNZlN1FYEhnMaEF'
  }
  
  const token = {
    key:    '959133594802409472-XPd71Ug4nbDR3m0bBOC8MT6b1iXSDZR',
    secret: 'QlGsnOCgw5dp9kbHB7Qfobdt44jWI7YpQ2mGeglFgeNj0'
  }
  
  const hashFunction = (baseString, key) => {
    return CryptoJS.HmacSHA1(baseString, key).toString(CryptoJS.enc.Base64)
  }
  
  const oauth = new OAuth(
    {
      consumer:         {
        key:    consumer.key,
        secret: consumer.secret
      },
      signature_method: 'HMAC-SHA1',
      hash_function:    hashFunction,
      nonce_length:     10,
      version:          '1.0',
      realm:            ''
    })
  
  const request = {
    url:     'https://api.twitter.com/1.1/statuses/home_timeline.json',
    method:  'GET',
    params:  {},
    headers: {}
  }
  
  const oauthObject = oauth.authorize(request, token)
  
  request.params = {
    oauth_consumer_key: oauthObject.oauth_consumer_key,
    oauth_token: oauthObject.oauth_token,
    oauth_nonce: oauthObject.oauth_nonce,
    oauth_signature:oauthObject.oauth_signature,
    oauth_signature_method: oauthObject.oauth_signature_method,
    oauth_version: oauthObject.oauth_version,
  }
  
  request.headers = oauth.toHeader(oauthObject)


@Injectable({
    providedIn: 'root'
  })
export class NewsService {
    public news: any[];
    public newsUpdate: Subject<any>;

    constructor(private httpClient: HttpClient) {
        this.news = [];
        this.newsUpdate = new Subject<any>();
    }

    public sources = [
        'abc-news-au',
        'abc-news',
    ];

    //Get articles via API
    getNews() {
        this.httpClient.get<any>(`https://newsapi.org/v2/top-headlines?sources=${this.sources.join(',')}&apiKey=${APIKEY}`).subscribe(
            result => {
                console.log(result); //NYT nests results in 'results ' object
                this.news = result.articles;
                this.newsUpdate.next(this.news);
            }
        );
    }

    getNewsUpdate() {
        return this.newsUpdate.asObservable();
    }
    //Get twitter Home timeline
    getTwitter() {
        this.httpClient
        .get(request.url, {headers:request.headers,params:request.params}).subscribe(
            result => {
                console.log(result); 
              
        }
    );
}
}