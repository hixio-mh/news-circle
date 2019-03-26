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
  oldgroups =  [];
  updateGroup = new Subject<any>();
  user:any;

  constructor(private httpClient: HttpClient) {
      this.uid=-1;
      this.oldgroups = [  
        {"group_name":"UMSI", "group_id":"01"},
        {"group_name":"Sweet Home","group_id":"02"},
        {"group_name":"Friday Night Buddy", "group_id":"03"}
      ]
  
   }

   getIdbyEmail(useremail){
    if(useremail!=""){
      console.log(useremail);
      const params = new HttpParams().set('user_email', useremail);
      this.httpClient.get<any>(`${BACKEND_URL}users/`,{params}).subscribe(res => {
          this.uid = res[0]["user_id"];
          console.log(this.uid);
          this.userUpdate.next(this.uid);
         
    });   
  }
  return this.userUpdate.asObservable();
}

// getUserUpdate(){
//   return this.userUpdate.asObservable();
// }

getGroup(){
    console.log(this.uid);
    const uid = 3;
    this.httpClient.get<any>(`${BACKEND_URL}groups/${uid}`).subscribe(res => {
        console.log(res);
        this.oldgroups = res;
        this.updateGroup.next(this.uid);
        
    });
    return this.updateGroup.asObservable();
  // }else{
    
  //   return this.group;
  // }
}
}
