import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MessageService } from '../message/message.service';

let BACKEND_URL = environment.BACKEND_URL;

@Injectable({
    providedIn: 'root'
})

export class GroupNewsService {
    public news: any;
    private newsListener = new Subject<any>();

    constructor(private httpClient: HttpClient, private messageService: MessageService ) {
        
    }

    getGroupNews(groupId) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get<any>(`${BACKEND_URL}newsgroup/${groupId}`).subscribe(
                    result => {
                        this.news = result;
                        this.newsListener.next(this.news);
                        resolve(result)
                    }, (err) => {
                        console.log(`Cannot get news data due to ${err}`);
                        reject(err);
                    }
                )
            })
    }

    getGroupNewsUpdate() {
        return this.newsListener.asObservable();
    }

    sendThank(newsGroupId, userId, targetId) {
        let data = {
            thank_target: targetId,
            thank_origin: userId,
            news_group_id: newsGroupId
        }
        console.log(data)
        return new Promise(
            (resolve, reject) => {
                this.httpClient.post<any>(`${BACKEND_URL}thank/1/`, data).subscribe(
                    result => {
                        this.messageService.getThanks(targetId);
                        resolve(result);
                    }, err => {
                        console.log(`Cannot post data.`)
                        reject(err);
                    }
                )
            }
        )
    }

}