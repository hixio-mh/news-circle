import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GroupMemberService } from '../group-member/group-member.service';

const BACKEND_URL = 'http://localhost:8000/rest/';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private invitation: any;
  private invitationListener = new Subject();

  constructor(private httpClient:HttpClient, private groupMemberService: GroupMemberService) { }

  getInvitation(receiverId){
    return new Promise(
      (resolve, reject) => {
          this.httpClient.get<any>(`${BACKEND_URL}invitation/${receiverId}/`).subscribe(res => {
            res = res.filter(msg =>{
              return msg.status=="pending";
            });
            this.invitation = res;
            this.invitationListener.next( this.invitation)  ;
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
acceptInvitation(invitationId,receiverId,groupId){
  //change status:  pending->accept 
  const body = {"status":"accept"};
  this.httpClient.put<any>(`${BACKEND_URL}invitation/${invitationId}/`,body).subscribe(
    res=>{
       this.getInvitation(receiverId);
    });
  //2.update userGroup status
  let param = new FormData();
  param.append('user_id', receiverId);
  param.append('group_id', groupId);
  param.append('status', 'accept');
  this.httpClient.post<any>(`${BACKEND_URL}usergroup/`,param).subscribe(
          res=>{
             this.groupMemberService.getMembers(res.group);
        });
  }

rejectInvitation(invitationId,receiverId,groupId){
  // const body = {"status":"reject"};
  let body = new FormData();
  body.append('status', "reject");
  this.httpClient.put<any>(`${BACKEND_URL}invitation/${invitationId}/`,body).subscribe(
    res=>{
       this.getInvitation(receiverId);
    });
  //2.update userGroup status
  body.append('user_id',receiverId) 
  body.append('group_id',groupId) 
  this.httpClient.put<any>(`${BACKEND_URL}usergroup/`,body).subscribe(
          res=>{
             console.log(res.group);
             this.groupMemberService.getMembers(res.group);

        });
  
}

  }

