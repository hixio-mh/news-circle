import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../../models/group.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  @Input() groupId: number;

  private name: string;
  private description: string;

  constructor(private groupService: GroupService, private modalController: ModalController) {
     
  }

  ngOnInit() {
    this.groupService.getGroupById(this.groupId).then(
      res => {
        this.name = res['group'].group_name;
        this.description = res['group'].group_description;
      }
    )
  }

  onSave() {
    let newGroup: Group = {
      group_name : this.name,
      group_description : this.description
    }

    this.groupService.updateGroup(this.groupId, newGroup);
    this.modalController.dismiss();
  }

}
