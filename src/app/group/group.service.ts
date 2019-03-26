import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Group } from '../models/group.model';

const BACKEND_URL = 'http://localhost:8000/rest/';

@Injectable({
    providedIn: 'root'
  })
export class GroupService {
    private groups: Group[];
    private groupsListender = new Subject();
    
    constructor (private httpClient: HttpClient) {
    }

    getGroups (user) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get<any>(`${BACKEND_URL}groups/${user.user_id}`).subscribe(res => {
                    console.log(res);
                    resolve(res);
                    // this.groups = res.
                }, err => {
                    console.log("cannot get groups");
                    reject(err);
                });
            }
        );
    }
}