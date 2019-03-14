import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

//Ok let's roll

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
        this.httpClient.get<any>('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=q5DYWq6v4jMl1N6xemfrA34rNHr4Avsw').subscribe(
            result => {
                console.log(result.results); //NYT nests results in 'results ' object
                this.news = result.results;
                this.newsUpdate.next(this.news);
            }

            
        );
       
    }

    getNewsUpdate() {
        return this.newsUpdate.asObservable();
    }

    //Add article to DB
    addNewsNYT() {
        this.httpClient.post<any>(this.news)
        .pipe(
            catchError(this.handleError('addNewsNYT', hero))
        );
    }

}