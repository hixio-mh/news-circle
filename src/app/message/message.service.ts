import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL = 'http://localhost:8000/rest/';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private invitation: any;
  private invitationListener = new Subject();

  constructor(private httpClient:HttpClient) { }

  getInvitation(receiverId){
    return new Promise(
      (resolve, reject) => {
          this.httpClient.get<any>(`${BACKEND_URL}invitation/${receiverId}/`).subscribe(res => {
            res = res.filter(msg =>{
              return msg.status=="pending";
            });
            this.invitationListener.next(res)  ;
            resolve(res);
          }, err => {
              console.log("cannot get invitaions");
              reject(err);
          });
      }
  );
    }
  invitationUpdate(){
    return this.invitationListener.asObservable();
  }
acceptInvitation(invitationId,receiverId){
  //change status:  pending->accept 
  const body = {"status":"accept"};
  this.httpClient.put<any>(`${BACKEND_URL}invitation/${invitationId}/`,body).subscribe(
    res=>{
       this.getInvitation(receiverId);
    });
  
  //update userGroup
  // let request = {user}
  // this.httpClient.post<any>(`${BACKEND_URL}group/${receiverId}/`,request).subscribe(
   
}
rejectInvitation(invitationId,receiverId){
  const body = {"status":"reject"};
  this.httpClient.put<any>(`${BACKEND_URL}invitation/${invitationId}/`,body).subscribe(
    res=>{
       this.getInvitation(receiverId);
    });
}
  }

