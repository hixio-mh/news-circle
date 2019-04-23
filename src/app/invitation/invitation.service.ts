import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GroupMemberService } from '../group-member/group-member.service';
import { MessageService } from '../message/message.service';

import { environment } from '../../environments/environment';

let BACKEND_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  uid: number;
  userUpdate = new Subject<any>();
  user:any;

  constructor(private httpClient: HttpClient, private groupMemberService: GroupMemberService, private messageService:MessageService) {
  
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

             //1. notify user-group pending status

            let param = new FormData();
            param.append('user_id', receiverId);
            param.append('group_id', groupId);
            param.append('status', 'pending');
            this.httpClient.post<any>(`${BACKEND_URL}usergroup/`,param).subscribe(
                    res=>{
                        this.httpClient.get<any>(`${BACKEND_URL}user/${res['user']}`).subscribe(
                        res=>{
                        console.log(res);
                            let newPending = {};
                            newPending['user'] = res;
                            this.groupMemberService.statusUpdate(newPending);
                        })
                    });

            //2 add invitation
            let body = new FormData();
            body.append('sender', senderId);
            body.append('receiver', receiverId);
            body.append('group', groupId);

            this.httpClient.post<any>(`${BACKEND_URL}invitation/`, body).subscribe(res => {
                console.log(res);
                }
            );

            //3 update message inbox
            this.messageService.getInvitation(receiverId);

}
   
  
}
