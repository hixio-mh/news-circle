import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { Subject } from 'rxjs';
import { GroupService } from './group.service';
import { User } from '../models/user.model';
import { GroupModalComponent } from './group-modal/group-modal.component';
import {NavController, ModalController } from '@ionic/angular';

import { CreateModalComponent } from './create-modal/create-modal.component';
import { AlertController } from '@ionic/angular';
import { AppService } from '../app.service';
@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  private groups: any;
  private groupsUpdate = new Subject();
  private curUserId: number;

  constructor(private groupService: GroupService,
    private modalController: ModalController, public alertController: AlertController, private nav:NavController) {
    
    this.curUserId = parseInt(localStorage.getItem('user_id'));
    groupService.fetchGroups(this.curUserId).then(
      res => {
        this.groups = res;
        console.log(this.groups);
        this.groupService.getGroupUpdated().subscribe(
          updated => {
            this.groups = updated;
            
          }
        )
      }
    )
  }

  async createGroup() {
    const modal = await this.modalController.create({
      component: CreateModalComponent,
      componentProps: {'uid': this.curUserId}
    });

    return await modal.present();
  }

  

  async manageGroup(groupId) {
    // Update group
    const modal = await this.modalController.create({
      component: GroupModalComponent,
      componentProps: {
        'groupId': groupId,
      }
    });

    return await modal.present();
  }

  async deleteGroup(groupId) {
    const alert = await this.alertController.create({
      header: 'Are you sure to delete this group?',
      message: 'This will let you exit the group.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { console.log("Cancel")}
        },
        {
          text: 'Yes',
          handler: () => { this.groupService.deleteGroup(groupId) }
        }]
    });

    await alert.present();
  }

  manageMember(groupId){
    this.nav.navigateForward(`/groupmember/${groupId}`);
  }
  
  ngOnInit() {
  }

}
