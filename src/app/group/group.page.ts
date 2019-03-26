import { Component, OnInit } from '@angular/core';
import { Group } from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { GroupService } from './group.service';
import { User } from '../models/user.model';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
})
export class GroupPage implements OnInit {
  private groups: any;
  private groupsUpdate = new Subject();
  private curUser: User = {
    user_email: "admin@umich.edu",
    user_id: 1,
    user_key: "admin",
    user_name: "admin"
};

  constructor(private groupService: GroupService,
    private modalController: ModalController) {
    groupService.getGroups(this.curUser).then(
      res => {
        this.groups = res;
        console.log(res);
      }
    )
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

  ngOnInit() {
  }

}
