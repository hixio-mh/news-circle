import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthAPIService } from './auth/auth.service';
import { User } from './models/user.model';

// const BACKEND_URL = 'http://localhost:8000/rest/';
const BACKEND_URL = 'https://news-circle.herokuapp.com/rest/';

@Injectable({
    providedIn: 'root'
})


export class AppService {
    public curUser: User;

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

    getCurUser() {
        return this.curUser;
    }
}