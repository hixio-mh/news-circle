import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable,Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.BACKEND_URL;

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  // membersObservable:Observable<any>;
  // membersObserver: Observer<any>;
  // memberList:Subject<any>;
  members: any;
  membersListener = new Subject();
  groupId: any;
  groupName: String;
  curUserId: number;
  userGroup:any;
  pendingUsers:any;
  pendingListener = new Subject();

  constructor(private httpClient:HttpClient) { 
  }

  getGroup(groupId){
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`).subscribe( res => {
              resolve(res);
          }, err => {
            reject(err);
          });
        }
        );
  }
  getMembers (groupId) {
    return new Promise(
        (resolve, reject) => {
            this.httpClient.get<any>(`${BACKEND_URL}usergroup/${groupId}/`).subscribe(res => {
              console.log(res);
              this.members = res.filter(user=>{
                return user.status=="accept"}
                );
                console.log(this.members);

              this.membersListener.next(this.members)  ;
              this.pendingUsers = res.filter(user=>{
                  return user.status=="pending"}
                  );
              console.log(this.pendingUsers);
              this.pendingListener.next(this.pendingUsers);
              resolve(res);
            }, err => {
                console.log("cannot get group's members");
                reject(err);
            });
        }
    )
    }

pendingListUpdate(){
return this.pendingListener.asObservable();
}

memberUpdate(){
  return this.membersListener.asObservable();
  }

removeMember(groupId, userId){
    return new Promise(
    (resolve, reject) => {
      const params = new HttpParams()
            .set('group_id',groupId)
            .set('user_id', userId);
        this.httpClient.delete<any>(`${BACKEND_URL}usergroup/`,{params}).subscribe(res => { 
          console.log(this.members);
          this.getMembers(groupId);
          resolve(res);
            
        }, err => {
            console.log("cannot delete group-member");
            reject(err);
        });
    } 
);
}

statusUpdate(res){
  this.pendingUsers.push(res);
  this.pendingListener.next(this.pendingUsers);
}


}
