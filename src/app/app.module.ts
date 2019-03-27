import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NewsService } from './newsfeed/newsfeed.service';
import { ArticlePage } from './newsfeed/newsfeed.article';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GroupPageModule } from './group/group.module';
import { GroupModalComponent } from './group/group-modal/group-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlePage,
  ],
  entryComponents: [GroupModalComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    GroupPageModule,
    IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    StatusBar,
    InAppBrowser,
    NewsService,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}