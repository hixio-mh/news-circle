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
  sender:any;
  receiver: any;
  groupId:number;

  constructor(private navParams:NavParams,private modalController:ModalController, private invitation:InvitationService) {
    this.groupId = this.navParams.get("groupId");
    this.sender =  this.navParams.get("curUserId");
    this.invitation.getUser().then(
          res=>{
            console.log(res);
            this.users = res;
            //filter curUser & user in the group;
          }
      )
      
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
    this.receiver.forEach(receiver => {
      this.invitation.invite(this.groupId,this.sender,receiver.user_id);
    })

    this.close();
  }
  

}

