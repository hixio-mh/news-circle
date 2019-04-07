import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
//For info on how we're sending data to django, see 'Sending data to the server' in the HttpClient section of these docs: https://angular.io/guide/http
import { HttpHeaders } from '@angular/common/http';
import { GroupService } from '../group/group.service';
import { reject } from 'q';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
const BACKEND_URL = 'http://localhost:8000/rest/';
//Ok let's roll

@Injectable({
    providedIn: 'root'
  })
export class NewsService implements OnInit {
    public news: any[];
    public newsUpdate: Subject<any>;
    private paramsSubscription: Subscription;
    private groupId: number;
    private curUserId: number;

    constructor(
        private httpClient: HttpClient, 
        private route: ActivatedRoute,
        private groupService: GroupService
        ) {
        this.curUserId = parseInt(localStorage.getItem('user_id'));
        this.news = [];
        this.newsUpdate = new Subject<any>();
    }

    fetchGroups() {
        this.groupService.fetchGroups(this.curUserId);
    }

    //Get articles via API
    
    getNews() {
        let param = "";
        if (this.groupId) {
            param = `${this.groupId}/`;
        }
        this.httpClient.get<any>(`${BACKEND_URL}news/${param}`).subscribe(
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
    shareToGroup(groups, news_id) {
        return new Promise( (resolve, reject) => {
            this.httpClient.post<any>(`${BACKEND_URL}newsgroup/${news_id}/`, groups).subscribe(res => {
                console.log(res)
                resolve(res);
            }, err => {
                reject(err);
            });
        })
    }
}