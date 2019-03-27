import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { InvitationService } from './invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  users:any;
  receiver: any;

  constructor(private navParams:NavParams,private modalController:ModalController, private invitation:InvitationService) {
      this.invitation.getUser().then(
          res=>{
            this.users = res;
          }
      )
      console.log(this.users);
  }

  ngOnInit() {
    
  }
  close(){
    this.modalController.dismiss();
  }
  send(){
    this.receiver =  this.users.filter(user => {
    return user.checked;
  });  
    console.log(this.receiver);
    // invitation sent: groupid,userid,receiverid
    this.close();
  }
  

}

