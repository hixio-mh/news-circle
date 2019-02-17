import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: 'newsfeed.page.html',
  styleUrls: ['newsfeed.page.scss']
})
export class NewsfeedPage {
  newsfeed: any[];
  
  constructor(private newsService: NewsService) {
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
