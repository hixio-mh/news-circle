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
  membersObservable:Observable<any>;
  membersObserver: Observer<any>;
  memberList:Subject<any>;
  groupId: any;

  constructor(private httpClient:HttpClient,private activatedRoute: ActivatedRoute) { 
    this.membersObserver = new Subject<any>();
    this.membersObservable = Observable.create(observer=>{
      this.membersObserver = observer;
    });
  }

  
  getMembers (groupId) {
    this.membersObservable =this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`);
    return this.membersObservable;
  }


    // return new Promise(
    //     (resolve, reject) => {
    //         this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`).subscribe(res => {
    //             resolve(res);
    //         }, err => {
    //             console.log("cannot get group's members");
    //             reject(err);
    //         });
    //     }
    // );

memberListUpdate(groupId){
   this.getMembers(groupId).subscribe(res=>{
     this.membersObservable = res["users"];
     this.membersObserver.next(this.membersObservable);

   }

   );
  
  }

removeMember(groupId, userId){
    return new Promise(
    (resolve, reject) => {
      const params = new HttpParams()
            .set('group_id',groupId)
            .set('user_id', userId);
        this.httpClient.delete<any>(`${BACKEND_URL}usergroup/`,{params}).subscribe(res => {
            resolve(res);
        }, err => {
            console.log("cannot delete group-member");
            reject(err);
        });
    } 
);
}


}
