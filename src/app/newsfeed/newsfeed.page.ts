import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { ArticlePage } from './article.page';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthAPIService } from '../auth/auth.service';

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
  constructor(private newsService: NewsService, private router: Router,private authService: AuthAPIService ) {
 
      this.newsfeed = newsService.news;
      this.newsService.getNews();
      this.newsService.getNewsUpdate().subscribe(
          data => {
            this.newsfeed = data;
          }
      );

  }

  goToArticle(article, source) {

<<<<<<< HEAD
    this.router.navigate(['article',{article:article, source:source}]);
=======
    // this.router.navigate(['tabs/tab1/article',{article:article}]);
>>>>>>> front end menu


  }


}

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


// export class ArticleNav {

//   constructor(private router: Router) {}

//   goToArticle(article) {

//     this.router.navigate(['article',{article:article}]);

//   }

// }

