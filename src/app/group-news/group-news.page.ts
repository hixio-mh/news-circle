import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { GroupService } from '../group/group.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GroupNewsService } from './group-news.service';
import { ShareModalComponent } from '../newsfeed/share-modal/share-modal.component';

@Component({
  selector: 'app-group-news',
  templateUrl: './group-news.page.html',
  styleUrls: ['./group-news.page.scss'],
})
export class GroupNewsPage {
  newsfeed: any;
  newsUpdate = new Subject();
  groups: any;
  groupId: number;
  private curUserId: number;

  constructor(
    private groupNewsService: GroupNewsService,
    private router: Router,
    private modalController: ModalController,
    private iab: InAppBrowser,
    private route: ActivatedRoute,
    private groupService: GroupService) {
      this.groupId = this.route.snapshot.params.id
      this.newsfeed = this.groupNewsService.news;
      this.groupNewsService.getGroupNews(this.groupId);
      this.groupNewsService.getGroupNewsUpdate().subscribe( updated => {
        this.newsfeed = updated;
        console.log(this.newsfeed);
      })
      this.curUserId = parseInt(localStorage.getItem('user_id'));
        this.route.params.subscribe(
            params => {
                this.groupId = params['id']
                this.groupNewsService.getGroupNews(this.groupId).then(
                  res => {
                    this.newsfeed = res;
                  }
                )
            }
        )
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
    goToArticle(article, source) {
      // this.router.navigate(['article',{article:article, source:source}]);
      const browser = this.iab.create(article);
  
      this.router.navigate(['article',{article:article, source:source}]);
  
      // this.router.navigate(['tabs/tab1/article',{article:article}]);
    }

    async onShare(id) {
      const modal = await this.modalController.create(
        {
          component: ShareModalComponent,
          componentProps: {'groups': this.groups, 'id': id, 'userId': this.curUserId}
        }
      )
      return await modal.present();
    }

    onThank(newsGroupId, targetId) {
      this.groupNewsService.sendThank(newsGroupId, this.curUserId, targetId);
      this.groupNewsService.getGroupNews(this.groupId);
    }
}
