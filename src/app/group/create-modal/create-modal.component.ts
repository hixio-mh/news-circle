import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../../models/group.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  private name: string;
  private description: string;

  constructor(private groupService: GroupService, private modalController: ModalController) {
    this.name = "";
    this.description = "";
  }

  ngOnInit() {
  }

  onSave() {
    let newGroup: Group = {
      group_name: this.name,
      group_description: this.description,
    }
    this.groupService.createGroup(newGroup, 1);
    this.modalController.dismiss();
  }

}
