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

    fetchGroups (user) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.get<any>(`${BACKEND_URL}groups/${user.user_id}`).subscribe(res => {
                    this.groups = res;
                    this.groupsListender.next([...this.groups]);
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
                    // Update local list to make sure the list updated without refreshing the page
                    this.groups.map(d => {
                        if (d.group_id === id) {
                            d.group_name = newGroup.group_name;
                            d.group_description = newGroup.group_description;
                        }
                    });
                    this.groupsListender.next([...this.groups]);
                    resolve(res);
                }, err => {
                    reject(err);
                })
            }
        )
    }

    createGroup(group, uid) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.post<any>(`${BACKEND_URL}group/${uid}`, group).subscribe(res => {
                    // Update local list
                    let last_id = Math.max.apply(Math, this.groups.map(group => group.group_id));
                    group.group_id = last_id
                    this.groups.push(group);
                    this.groupsListender.next([...this.groups]);
                    resolve(res);
                }, err => {
                    console.log("Cannot create group")
                    reject(err)
                })
            }
        )
    }

    deleteGroup(id) {
        return new Promise(
            (resolve, reject) => {
                this.httpClient.delete<any>(`${BACKEND_URL}group/${id}`).subscribe(res => {
                    this.groups = this.groups.filter(d => d.group_id !== id)
                    this.groupsListender.next([...this.groups]);
                    resolve(res);
                }, err => {
                    console.log("Cannot delete group");
                    reject(err);
                })
            }
        )
    }

    getGroupUpdated() {
        return this.groupsListender.asObservable();
    }

    // TODO: POST new group and DELETE group
}