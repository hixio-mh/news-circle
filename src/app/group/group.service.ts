import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Group } from '../models/group.model';
import { reject } from 'q';

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
                }, err => {
                    console.log("cannot get groups");
                    reject(err);
                });
            }
        );
    }

    getGroupById(id) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get<any>(`${BACKEND_URL}group/${id}`).subscribe(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                });
            }
        )
    }
    
    updateGroup(id, newGroup) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.put<any>(`${BACKEND_URL}group/${id}/`, newGroup)
                .subscribe(res => {
                    resolve(res);
                }, err => {
                    reject(err);
                })
            }
        )
    }

    // TODO: POST new group and DELETE group
}