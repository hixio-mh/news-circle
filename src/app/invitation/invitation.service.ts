import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL = 'http://localhost:8000/rest/';
@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  uid: number;
  userUpdate = new Subject<any>();
  user:any;

  constructor(private httpClient: HttpClient) {
  
   }
   getUser(){
    return new Promise(
      (resolve, reject) => {
          this.httpClient.get<any>(`${BACKEND_URL}users`).subscribe(res => {
              resolve(res);
          }, err => {
              console.log("cannot get users");
              reject(err);
          });
      }
  );
}
    invite(groupId, senderId, receiverId){
        return new Promise(
            (resolve, reject) => {
                let body = new FormData();
                body.append('sender', senderId);
                body.append('receiver', receiverId);
                body.append('group', groupId);

                this.httpClient.post<any>(`${BACKEND_URL}invitation/`, body).subscribe(res => {
                    console.log()
                    resolve(res);
                }, err => {
                    console.log("cannot invite users");
                    reject(err);
                });
            }
        );
    }
   
  
}
