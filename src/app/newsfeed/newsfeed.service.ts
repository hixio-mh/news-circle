import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
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
export class NewsService implements OnInit {
    public news: any[];
    public newsUpdate: Subject<any>;
    private paramsSubscription: Subscription;
    private groupId: number;

    constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
        this.news = [];
        this.newsUpdate = new Subject<any>();
    }

    //Get articles via API
    
    getNews() {
        let param = "";
        if (this.groupId) {
            param = `${this.groupId}/`;
        }
        this.httpClient.get<any>(`http://127.0.0.1:8000/rest/news/${param}`).subscribe(
            result => {
                console.log(result); //NYT nests results in 'results ' object
                this.news = result;
                this.newsUpdate.next(this.news);
            }
        );
       
    }

    getNewsUpdate() 
 {       return this.newsUpdate.asObservable();
    }

    ngOnInit() {
        this.groupId = this.route.snapshot.params['id'];
        this.paramsSubscription = this.route.params.subscribe(
            (params: Params) => {
                this.groupId = params['id'];
            }
        )
    }

    //Add article to DB

}