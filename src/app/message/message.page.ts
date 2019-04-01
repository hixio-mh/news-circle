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
  filterList: any;

  constructor(private message: MessageService) {
    this.receiverId = 1; //TODO: GET cur-user
    this.message.getInvitation(this.receiverId).then(res=>{
        this.invitationList = res;
          })
        console.log(this.invitationList);
          this.message.invitationUpdate().subscribe(
          updated=>{
            this.invitationList = updated;
            console.log(this.invitationList);
          });
    
        }
    


  ngOnInit() {
    
}

  accept(invitationId){
    //status change: accept
    console.log(invitationId);
    this.message.acceptInvitation(invitationId,this.receiverId);
    // put into userGroup 
  }

  decline(invitationId){
    //status change: decline
    this.message.rejectInvitation(invitationId,this.receiverId);
  }

}
