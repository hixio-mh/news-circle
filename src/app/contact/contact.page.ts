import { Component, OnInit } from '@angular/core';
import {ContactService} from './contact.service';
import {AuthAPIService} from '../auth/auth.service';
import { from } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { InvitationPage } from '../invitation/invitation.page';

const default_avatar: string = "../../assets/image/batman.png";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contacts: any [];
  contact: any;
  contact_id:any;
  contact_name:String;
  user: any;
  constructor(private authService: AuthAPIService,private contactService: ContactService,private modalController: ModalController) {
    if(authService.curUser!=null){
    this.user = authService.curUser;
    this.contactService.getContacts(this.user.user_email).subscribe(
      data => {
        this.contacts = data;
      });
  }else{
    this.user = contactService.user;
    this.contacts = contactService.contacts;
  }
    
    
   
   }

  ngOnInit() {
    console.log(this.contacts);
  }
  
  async invite(contact:any){
    const modal = await this.modalController.create({
      component:InvitationPage,
      componentProps:{
        contact: contact,
        user:this.user
      }
    });
    modal.present();
  }
}
