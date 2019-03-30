import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const BACKEND_URL = 'http://localhost:8000/rest/auth/';
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
          console.log("successfully login");
          this.isAuth = true;
          this.isAuthListener.next(true);
          this.curUser = user;
          this.curUserListener.next(this.curUser);
          resolve(res);
        }, err => {
          console.log("cannot login");
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