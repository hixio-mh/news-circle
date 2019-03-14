import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

// import { environment } from '../../environments/environment';
const BACKEND_URL = 'http://localhost:8000/auth/convert-token';
@Injectable({
  providedIn: 'root'
})
export class AuthAPIService {
  private authStatusListener = new Subject<boolean>();
  private token;
  isAuthenticated = false;

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  postData(credentials, type) {
    // Post user data to backend /auth/convert-token url
    // Backend gonna return an access_token for the user
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

    return new Promise(
     (resolve, reject) => {
       this.httpClient.post<any>(BACKEND_URL, JSON.stringify(credentials),
       {headers: headers}).subscribe(
         res => {
           console.log('success post the data -auth service');
           const token = res.token;
           this.token = token;
           this.isAuthenticated = true;
           console.log(this.isAuthenticated);
           this.authStatusListener.next(true);
           resolve(res);
         }, (err) => {
           console.log('error posting data -auth service');
           reject(err);
         }
       );
     }
    );
  }

  constructor(private httpClient: HttpClient, private router: Router) {}
}