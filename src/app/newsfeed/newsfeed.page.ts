import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { ArticlePage } from './newsfeed.article';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsfeed',
  templateUrl: 'newsfeed.page.html',
  styleUrls: ['newsfeed.page.scss']
})
export class NewsfeedPage {
  newsfeed: any[];

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2

  //Notice multiple parameters in one constructor
  constructor(private newsService: NewsService, private router: Router) {
    this.newsfeed = newsService.news;
    this.newsService.getNews();
    this.newsService.getNewsUpdate().subscribe(
      data => {
        console.log(data);
        this.newsfeed = data;
      }
    );

  }

  goToArticle(article) {

    this.router.navigate(['tabs/tab1/article',{article:article}]);


  }


}

//https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


// export class ArticleNav {

//   constructor(private router: Router) {}

//   goToArticle(article) {

//     this.router.navigate(['article',{article:article}]);

//   }

// }

