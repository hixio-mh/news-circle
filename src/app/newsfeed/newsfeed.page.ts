import { Component } from '@angular/core';
import { NewsService } from './newsfeed.service';
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
  
  constructor(private newsService: NewsService,
              private authService: AuthAPIService,
              ) {
    this.isAuthed = this.authService.getIsAuth();
    this.isAuthedUpdate = this.authService.getAuthStatusListener().subscribe(
      status => {
        this.isAuthed = status;
        console.log('status changed');
      }
    );
    this.newsfeed = newsService.news;
    this.newsService.getNews();
    this.newsService.getNewsUpdate().subscribe(
      data => {
        this.newsfeed = data;
      }
    );
  }
}
