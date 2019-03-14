import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
}