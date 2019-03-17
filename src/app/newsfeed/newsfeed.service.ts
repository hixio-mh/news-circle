import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import {OAuth} from 'oauth-1.0a';
// import {CryptoJS} from 'crypto-js';

const APIKEY = environment.APIKEY;

declare const require: any;
const request = require('request');
const OAuth   = require('oauth-1.0a');
const crypto  = require('crypto-js');

// Initialize
const oauth = OAuth({
    consumer: {
      key: 'b4RmauUrY3VPxtJid4f0Q5BM3',
      secret: 'Ue0iNQXEqGj3d9N2LHx8T4fJaLRBc2a63ItZNZlN1FYEhnMaEF'
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        crypto.createHmac('sha1', key).update(base_string).digest('base64');
    //   "pkNFZDk9jHU0PKD9Owj%2BK053Mis%3D";
    },
    nonce_length:6,
    version:'1.0',
    realm:''
  });
   
  const request_data = {
    url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
    method: 'GET',
    params:  {},
    headers: {}
  };
   
  // Note: The token is optional for some requests
  const token = {
    key: '959133594802409472-XPd71Ug4nbDR3m0bBOC8MT6b1iXSDZR',
    secret: 'QlGsnOCgw5dp9kbHB7Qfobdt44jWI7YpQ2mGeglFgeNj0'
  };
 


@Injectable({
    providedIn: 'root'
  })
export class NewsService {
    public news: any[];
    public newsUpdate: Subject<any>;
    public request_data;
   

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
    getTwitter(){

        request({
            url: request_data.url,
            method: request_data.method,
            form: oauth.authorize(request_data, token)
          }, function(error, response, body) {
            // Process your data here
            console.log(error);
          });
    }



}


