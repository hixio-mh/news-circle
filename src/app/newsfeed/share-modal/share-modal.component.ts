import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../newsfeed.service';
import { identifierModuleUrl } from '@angular/compiler';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {
  @Input() groups;
  @Input() id;
  @Input() userId;

  constructor(private newsService: NewsService, private modal: ModalController) {
  }

  ngOnInit() {
    this.groups.map(g => g["checked"] = false);
  }

  onShare() {
    console.log(this.id);
    let selectedGroups = this.groups.filter(g => g.checked == true)
    selectedGroups.map(d => {
      d.user_id = this.userId;
      d.news_id = this.id;
    })
    this.newsService.shareToGroup(selectedGroups, this.id);
    this.modal.dismiss();
  }
}
