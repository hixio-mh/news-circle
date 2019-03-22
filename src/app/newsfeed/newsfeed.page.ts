import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { ArticlePage } from './newsfeed.article';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';


//On routes in Ionic 4
const routes: Routes = [
  { path: 'article/:url', component: ArticlePage },
];


@Component({
  selector: 'app-newsfeed',
  templateUrl: 'newsfeed.page.html',
  styleUrls: ['newsfeed.page.scss']
})
export class NewsfeedPage {
  newsfeed: any[];

  articlePage = ArticlePage;
  
  constructor(private newsService: NewsService, navCtrl: NavController) {
    this.newsfeed = newsService.news;
    this.newsService.getNews();
    this.newsService.getNewsUpdate().subscribe(
      data => {
        console.log(data);
        this.newsfeed = data;
      }
    );

  }
}

export class ArticleNav {

  constructor(private router: Router) {
      //Injects the nav controller (default from ionic), need this to do any kind of navigation
  }

  onLoadArticle(articleUrl: string) {

    this.router.navigate(['/article', { id: articleUrl }]);
  }
}
