import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { InvitationService } from './invitation.service';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage implements OnInit {
  contact:any;
  groups: any;
  checkedGroups:any;
  user:any;
  id:number;

  constructor(private navParams:NavParams,private modalController:ModalController, private invitation:InvitationService) {
    this.contact= this.navParams.get('contact');
    this.user = this.navParams.get('user');
    console.log(this.user);
    
    this.id =this.invitation.uid;
    this.groups = this.invitation.oldgroups;

    this.invitation.getIdbyEmail(this.user.user_email).subscribe(
      data => {
        this.id = data;
        
      });
      
    this.invitation.getGroup().subscribe(
         data=>{
          this.groups =data;
         }
    );
   
   }

  ngOnInit() {
    
  }
close(){
  this.modalController.dismiss();
}
send(){
  this.checkedGroups =  this.groups.filter(group => {
    return group.checked;
  });  
  console.log(this.id);
  
  this.close();
  }
  

}
