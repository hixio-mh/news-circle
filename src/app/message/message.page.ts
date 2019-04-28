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
  thanksList:any;
  inbox: any;

  sliderConfig = {
    slidesPerView: 2.2,
    spaceBetween: 2,
  };

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
    this.message.getThanks(this.receiverId);
    this.message.thanksUpdate().subscribe(
          updated=>{
            this.thanksList = updated;
            console.log(this.thanksList);
    });
    this.inbox = 'invitation';
  }
    
  segmentChanged(event) {
    this.inbox = event;
  }

  ngOnInit() {
    
}

  accept(invitationId,groupId){
    //status change: accept, then put into userGroup 
    console.log(invitationId);
    this.message.acceptInvitation(invitationId,this.receiverId,groupId);
  }

  decline(invitationId,groupId){
    //status change: decline
    this.message.rejectInvitation(invitationId,this.receiverId,groupId);
  }
  readThank(thank_id,thank){
    this.message.readThank(thank_id,thank);
    // this.thanksList.splice(index,1);

}

}
