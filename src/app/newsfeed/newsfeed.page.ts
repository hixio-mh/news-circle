import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { ArticlePage } from './article/article.page';
import { NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { AuthAPIService } from '../auth/auth.service';
import {NavController, ModalController } from '@ionic/angular';
import { GroupService } from '../group/group.service';
import { ShareModalComponent } from './share-modal/share-modal.component';
import { News } from '../models/news.model';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-newsfeed',
  templateUrl: 'newsfeed.page.html',
  styleUrls: ['newsfeed.page.scss']
})
export class NewsfeedPage {
  newsfeed: News[];
  isAuthed: Boolean = false;
  isAuthedUpdate: Subscription;
  groups: any;
  groupsUpdate = new Subject();
  private curUserId: number;

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2

  //Notice multiple parameters in one constructor
  constructor(private newsService: NewsService, private router: Router,private authService: AuthAPIService, private modalController: ModalController, private groupService: GroupService, private iab: InAppBrowser) {
      this.newsfeed = newsService.news;
      this.newsService.getNews();
      this.newsService.getNewsUpdate().subscribe(
          data => {
            this.newsfeed = data;
          }
      );
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

}

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


// export class ArticleNav {

//   constructor(private router: Router) {}

//   goToArticle(article) {

//     this.router.navigate(['article',{article:article}]);

//   }

// }

