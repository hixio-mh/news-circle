import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const BACKEND_URL = 'http://localhost:8000/rest/';
@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  members:any;
  constructor(private httpClient:HttpClient) { }

  getMembers (groupId) {
    return new Promise(
        (resolve, reject) => {
            this.httpClient.get<any>(`${BACKEND_URL}group/${groupId}`).subscribe(res => {
                resolve(res);
            }, err => {
                console.log("cannot get groups");
                reject(err);
            });
        }
    );
}
}
