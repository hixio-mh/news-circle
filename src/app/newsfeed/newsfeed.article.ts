import { Component, OnInit } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: 'newsfeed.article.html',
  styleUrls: ['newsfeed.article.scss']
})
export class ArticlePage implements OnInit {
  newsfeed: any[];

  articleUrl: string;
  
  //This will allow us to pass properties as navigation parameters
  constructor (
        //Bring in NavController, required to do any kind of navigation
         private navCtrl: NavController)  {}

  ngOnInit() { //Also this, also necessary for passing data as nav params
    this.articleUrl = this.navParams.get('articleUrl') //parameter (specified as an object property) all defined in onLoadUser() in users.ts, look at that file and this will make sense.
  }

}
