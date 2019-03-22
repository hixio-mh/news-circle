import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  login(credential) {
    console.log(credential.username);
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    // Fake authenticated
    this.router.navigate(['/tabs/tab1']);
  }

  constructor(private httpClient: HttpClient,
              private router: Router
    ) {}
}