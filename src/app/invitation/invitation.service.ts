import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL = 'http://localhost:8000/rest/users';
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
  
   }
   getUser(){
    return new Promise(
      (resolve, reject) => {
          this.httpClient.get<any>(`${BACKEND_URL}`).subscribe(res => {
              console.log(res);
              resolve(res);
          }, err => {
              console.log("cannot get users");
              reject(err);
          });
      }
  );
}
   
  
}
