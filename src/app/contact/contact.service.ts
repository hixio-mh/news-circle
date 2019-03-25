import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
// pass params: https://www.tektutorialshub.com/angular/angular-pass-url-parameters-query-strings/

const BACKEND_URL = 'http://localhost:8000/rest/';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contacts = [];
  contactsUpdate = new Subject<any>();
  public user = {};


  constructor(private httpClient: HttpClient) {
    this.contacts=[
      { friend_name: 'Amanda',
        friend_email:'amanda@umich.edu'
      },
      {friend_name:'Bill',
      friend_email:'bill@umich.edu'
      }
    ]
    this.user = {
      "curuser_name":"unauth",
      "curuser_email":"unauth@umich.edu"
    }
  }
  
  getContacts(user_email){
    if(user_email!=null){
      const params = new HttpParams().set('curuser_email', user_email);
      this.httpClient.get<any>(`${BACKEND_URL}contacts/`,{params}).subscribe(res => {
        console.log(res);
        this.contacts = res;
        this.contactsUpdate.next(this.contacts);
    })
    return this.contactsUpdate.asObservable();
  }
}


}
