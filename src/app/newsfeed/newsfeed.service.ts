import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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

    getNews() {
        this.httpClient.get<any>('http://127.0.0.1:8000/rest/news/').subscribe(
            result => {
                console.log(result);
                this.news = result;
                this.newsUpdate.next(this.news);
            }
        );
    }

    getNewsUpdate() {
        return this.newsUpdate.asObservable();
    }
}