import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  public contacts = [];
  public user = {};
  constructor() {
    this.contacts=[
      { name: 'Amanda',
        id:1,
        email:'amanda@umich.edu'
      },
      {name:'Bill',
        id:2,
        email:'bill@umich.edu'
      }
    ]
    this.user = {
      "name":"Pan",
      "id":3,
      "email":"zfp@umich.edu"
    }
  }
}
