import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const BACKEND_URL = 'https://news-circle.herokuapp.com/rest/auth/';
const REST_URL = 'https://news-circle.herokuapp.com/rest/';

//const BACKEND_URL = 'http://localhost:8000/rest/auth/';
//const REST_URL = 'http://localhost:8000/rest/';
@Injectable({
  providedIn: 'root'
})

export class AuthAPIService {
  private isAuth: Boolean = false;
  private isAuthListener = new Subject<boolean>();
  public curUser: User = null;
  private curUserListener = new Subject<User>();

  constructor(private httpClient: HttpClient,
              private router: Router
    ) {}
  
  isAuthed() {
    return this.isAuth;
  }

  isAuthedUpdate() {
    return this.isAuthListener.asObservable();
  }

  curUserUpdate() {
    return this.curUserListener.asObservable();
  }

  register (user: User) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.post<any>(`${BACKEND_URL}register/`, user).subscribe(res => {
          console.log("successfully registered user");
          this.isAuth = true;
          this.isAuthListener.next(true);
          this.curUser = user;
          this.curUserListener.next(this.curUser);
          resolve(res);
        }, err => {
          console.log("cannot register user");
          reject(err);
        })
      }
    );
  }

  logIn (user: User) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.post<any>(`${BACKEND_URL}login/`, user).subscribe(res => {
          console.log(`successfully login, current user is ${user}`);
          this.isAuth = true;
          this.isAuthListener.next(true);
          this.getUserByEmail(user.user_email);
          resolve(res);
        }, err => {
          console.log("cannot login");
          reject(err);
        })
      }
    )
  }

  getUserByEmail(email) {
    return new Promise(
      (resolve, reject) => {
        this.httpClient.get<any>(`${REST_URL}users/?user_email=${email}`).subscribe(res => {
            console.log(`Fetched User is ${res[0].user_id}`);
            // Store current user to local storage
            localStorage.setItem('user_id', res[0].user_id);
            this.curUser = res[0];
            this.curUserListener.next(this.curUser);
            resolve(res);
        }, err => {
            console.log(`Cannot get user by email ${email}`);
            reject(err);
        })
      }
    )
  }

  logOut () {
    this.isAuth = false;
    this.isAuthListener.next(false);
    this.curUser = null;
    this.curUserListener.next(null);
  }
}