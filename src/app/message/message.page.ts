import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  invitationList:any;
  receiverId: any;
  group: any;

  constructor(private message: MessageService) {
    this.receiverId = parseInt(localStorage.getItem('user_id'));
    console.log(this.receiverId);
    this.message.getInvitation(this.receiverId).then(res=>{
        this.invitationList = res;
          })
        this.message.invitationUpdate().subscribe(
          updated=>{
            this.invitationList = updated;
            console.log(this.invitationList);
          });
    
    }
    


  ngOnInit() {
    
}

  accept(invitationId){
    //status change: accept, then put into userGroup 
    console.log(invitationId);
    this.message.acceptInvitation(invitationId,this.receiverId);
  }

  decline(invitationId){
    //status change: decline
    this.message.rejectInvitation(invitationId,this.receiverId);
  }

}
