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
        this.httpClient.get<any>('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=q5DYWq6v4jMl1N6xemfrA34rNHr4Avsw').subscribe(
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