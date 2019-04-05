import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupMemberService } from './group-member.service';
import { ModalController } from '@ionic/angular';
import { InvitationPage } from '../invitation/invitation.page';

@Component({
  selector: 'app-group-member',
  templateUrl: './group-member.page.html',
  styleUrls: ['./group-member.page.scss'],
})
export class GroupMemberPage implements OnInit {
  members: any;
  groupId: any;
  groupName: String;
  curUserId: number;
  userGroup:any;
  pendingUsers:any;


  constructor(private activatedRoute: ActivatedRoute, private groupMemberservice: GroupMemberService, private modaltrl:ModalController) {
    this.groupId = this.activatedRoute.snapshot.paramMap.get('id');
    this.curUserId = parseInt(localStorage.getItem('user_id'));
    this.groupMemberservice.getGroup(this.groupId).then(res=>
        this.groupName= res['group']['group_name']
    );

    this.groupMemberservice.getMembers(this.groupId);
    this.groupMemberservice.pendingListUpdate().subscribe(res=>{
        this.pendingUsers = res;
      }
    );
    this.groupMemberservice.memberUpdate().subscribe(res=>{
      this.members = res;
      }
    );  
  }
  
   async addUser(){
      const modal = await this.modaltrl.create({
      component:InvitationPage,
      componentProps: {
        'groupId': this.groupId,
        'curUserId':this.curUserId
      }
    });
    this.groupMemberservice.memberUpdate();
    return await modal.present();
  } 

  remove(userId){
      this.groupMemberservice.removeMember(this.groupId, userId);
  }
  ngOnInit() {

  }

}
