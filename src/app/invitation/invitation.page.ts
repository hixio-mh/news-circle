import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

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

  constructor(private navParams:NavParams,private modalController:ModalController) { }

  ngOnInit() {
    this.contact= this.navParams.get('contact');
    console.log(this.contact);
    this.user = this.navParams.get('user');
    this.groups = [
      {"name":"UMSI", "id":"01"},
      {"name":"Sweet Home","id":"02"},
      {"name":"Friday Night Buddy", "id":"03"}
    ]
      // console.log('${contact_id}')
  }
close(){
  this.modalController.dismiss();
}
send(){
  this.checkedGroups =  this.groups.filter(group => {
    return group.checked;
  });  
  console.log(this.user);
  
  this.close();
  }
  

}
