import { Component, OnInit, Input } from '@angular/core';
import { NewsService } from '../newsfeed.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {
  @Input() groups;
  @Input() id;

  constructor(private newsService: NewsService) {
  }

  ngOnInit() {
    this.groups.map(g => g["checked"] = false);
  }

  onShare() {
    console.log(this.id);
    let selectedGroups = this.groups.filter(g => g.checked == true)
    this.newsService.shareToGroup(selectedGroups, this.id);
  }
}
