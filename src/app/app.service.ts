import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAPIService } from './auth/auth.service';
import { User } from './models/user.model';
import { Group } from './models/group.model';
import { environment } from '../environments/environment';

const BACKEND_URL = environment.BACKEND_URL;

@Injectable({
    providedIn: 'root'
})


export class AppService {
    public curUser: User;
    public groups: Group[];

    constructor(private authService: AuthAPIService, private httpClient: HttpClient) {
        this.curUser = null;
        authService.curUserUpdate().subscribe(
            user => {
                console.log(user);
                this.curUser = user;
                let email = user.user_email;
                httpClient.get<any>(`${BACKEND_URL}users/?user_email=${email}`).subscribe(res => {
                    if (res) {
                        console.log(`Current User is ${res[0]}`)
                        this.curUser = res[0];
                    }
                });
            }
        )
    }

    getCurUserId() {
        return localStorage.getItem('user_id');
    }

    getGroups(uid) {
        return new Promise((resolve, reject) => {
            this.httpClient.get<any>(`${BACKEND_URL}groups/${uid}`).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }
}