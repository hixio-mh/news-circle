import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {
  @Input() groupId: number;

  constructor() {
    
  }

  ngOnInit() {
  }

}
