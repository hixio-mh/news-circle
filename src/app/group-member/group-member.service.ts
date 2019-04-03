import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable,Observer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const BACKEND_URL = 'http://localhost:8000/rest/';
@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  // membersObservable:Observable<any>;
  // membersObserver: Observer<any>;
  // memberList:Subject<any>;
  private members: any;
  private membersListener = new Subject();

  constructor(private httpClient:HttpClient) { 
    // this.membersObserver = new Subject<any>();
    // this.membersObservable = Observable.create(observer=>{
    //   this.membersObserver = observer;
    // });
  }

  
  getMembers (groupId) {
  //   this.membersObservable =this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`);
  //   return this.membersObservable;
  // }
    return new Promise(
        (resolve, reject) => {
            this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`).subscribe(res => {
              console.log(res);
              this.members = res;
              this.membersListener.next(this.members)  ;
              resolve(res);
            }, err => {
                console.log("cannot get group's members");
                reject(err);
            });
        }
    );
      }

// getReceivers(){
  
//   getinvitation.filter(group_id=id)=> user
// }

memberUpdate(){
  return this.membersListener.asObservable();
  //  this.getMembers(groupId).subscribe(res=>{
  //    this.membersObservable = res["users"];
  //    this.membersObserver.next(this.membersObservable);
  //    console.log(this.membersObservable);
  //  }
  //  );
  
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

// statusUpdate(groupId, receiverId, status){
//   let param = new FormData();
//   param.append('user_id', receiverId);
//   param.append('group_id', groupId);
//   param.append('status', status);
//   this.httpClient.post<any>(`${BACKEND_URL}usergroup/`,param).subscribe(
//           res=>{
//              console.log('success');
//              this.getMembers(groupId);
//              this.memberUpdate();
//           })
// }

}
