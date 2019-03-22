import { Component, OnInit } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: 'newsfeed.article.html',
  styleUrls: ['newsfeed.article.scss']
})
export class ArticlePage implements OnInit {
  newsfeed: any[];
  articleUrl: any;
  sub: any;

  constructor(private route: ActivatedRoute) {}
  
  //https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


  ngOnInit() {
      // this.getValue= this.router.snapshot.paramMap.get("item")
      //   console.log(JSON.parse(this.getValue))

      this.sub = this.route.params.subscribe(params => {
        this.articleUrl = params['articleUrl']; 
      });
  }

  



}
