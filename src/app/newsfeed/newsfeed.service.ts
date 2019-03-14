import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

const APIKEY = environment.APIKEY;
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

    //Get articles via API
    getNewsNYT() {
        this.httpClient.get<any>(`https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=${APIKEY}`).subscribe(
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
}