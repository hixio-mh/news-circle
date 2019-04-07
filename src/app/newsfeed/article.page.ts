import { Component, OnInit } from '@angular/core';
import { NewsService } from './newsfeed.service';
import { NavController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
//IMPORTANT, install this https://ionicframework.com/docs/native/in-app-browser#installation
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

// import { Pipe, PipeTransform } from '@angular/core';
// import { DomSanitizer} from '@angular/platform-browser';

//INCASE you want to use an iframe, do it this way:
//Sanitize URL - https://stackoverflow.com/questions/38037760/how-to-set-iframe-src-in-angular-2-without-causing-unsafe-value-exception


//Page elements
@Component({
  selector: 'app-article',
  templateUrl: 'article.page.html',
  styleUrls: ['article.page.scss']
})
export class ArticlePage implements OnInit {
  newsfeed: any[];
  article: any;
  source: any;
  sub: any;
  title: any;

  constructor(private route: ActivatedRoute, private router: Router, private iab: InAppBrowser) {}
  
  //https://forum.ionicframework.com/t/how-to-pass-data-from-1-page-to-another-using-navigation-in-ionic-4/151060/2


  ngOnInit() {
      // this.getValue= this.router.snapshot.paramMap.get("item")
      //   console.log(JSON.parse(this.getValue))

      this.sub = this.route.params.subscribe(params => {
        this.article = params['article']; 
        this.source = params['source']
      });

      console.log("Do we have it?");
      console.log(this.article);
      console.log(this.source);


      const browser = this.iab.create(this.article);



      // const browser = this.iab.create(this.article);

      // browser.executeScript();
  }

  onGoBack() {
    this.router.navigate(['tabs/tab1/']);
  }



}
