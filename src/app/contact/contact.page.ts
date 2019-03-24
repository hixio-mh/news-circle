import { Component, OnInit } from '@angular/core';
import {ContactService} from './contact.service';
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
  constructor(private contactService: ContactService,private modalController: ModalController) {
    this.contacts = contactService.contacts;
    this.user = contactService.user;

   }

  ngOnInit() {
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
