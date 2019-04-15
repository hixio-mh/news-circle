import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController,NavController } from '@ionic/angular';
import { InvitationService } from './invitation.service';
import { GroupMemberService } from '../group-member/group-member.service';

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
  groupName: any;

  constructor(private navParams:NavParams, private nav:NavController, private modalController:ModalController, private invitation:InvitationService, private groupMemberService: GroupMemberService) {
    this.groupId = this.navParams.get("groupId");
    this.sender =  this.navParams.get("curUserId");
    this.groupMemberService.getGroup(this.groupId).then(res=>
      this.groupName= res['group']['group_name']
  );
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

