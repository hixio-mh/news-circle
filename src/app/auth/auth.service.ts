import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

// import { environment } from '../../environments/environment';
const BACKEND_URL = 'http://localhost:8000/rest/auth/';
@Injectable({
  providedIn: 'root'
})

export class AuthAPIService {
  constructor(private httpClient: HttpClient,
              private router: Router
    ) {}

  register = (user) => {

  }
}