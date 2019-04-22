import { Component, OnInit, Input } from '@angular/core';
import { GroupService } from '../group.service';
import { Group } from '../../models/group.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.scss']
})
export class CreateModalComponent implements OnInit {
  @Input() uid: Number;
  private name: string;
  private description: string;

  constructor(private groupService: GroupService, private modalController: ModalController) {
    this.name = "";
    this.description = "";
  }

  ngOnInit() {
    console.log(this.uid)
  }

  onSave() {
    let newGroup: Group = {
      group_name: this.name,
      group_description: this.description,
    }
    this.groupService.createGroup(newGroup, this.uid);
    this.modalController.dismiss();
  }

}
