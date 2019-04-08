import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { ArticlePage } from './article.page';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthAPIService } from '../auth/auth.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-newsfeed',
  templateUrl: 'newsfeed.page.html',
  styleUrls: ['newsfeed.page.scss']
})
export class NewsfeedPage {
  newsfeed: any[];
  isAuthed: Boolean = false;
  isAuthedUpdate: Subscription;

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2

  //Notice multiple parameters in one constructor
  constructor(private newsService: NewsService, private router: Router,private authService: AuthAPIService, private iab: InAppBrowser ) {
 
      this.newsfeed = newsService.news;
      this.newsService.getNews();
      this.newsService.getNewsUpdate().subscribe(
          data => {
            this.newsfeed = data;
          }
      );

  }

  goToArticle(article, source) {

    // this.router.navigate(['article',{article:article, source:source}]);
    const browser = this.iab.create(article);


  }


}

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


// export class ArticleNav {

//   constructor(private router: Router) {}

//   goToArticle(article) {

//     this.router.navigate(['article',{article:article}]);

//   }

// }

