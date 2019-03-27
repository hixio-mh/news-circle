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
<<<<<<< HEAD
import { InvitationPageModule } from './invitation/invitation.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
=======
import { ArticlePage } from './newsfeed/newsfeed.article';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
>>>>>>> af93d57b020510be7f81c42046f064f27a79036d
import { GroupPageModule } from './group/group.module';
import { GroupModalComponent } from './group/group-modal/group-modal.component';
import {GroupMemberPageModule} from './group-member/group-member.module'

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
    GroupMemberPageModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    InvitationPageModule,
  ],
  providers: [
    StatusBar,
    InAppBrowser,
    NewsService,
    SplashScreen,
<<<<<<< HEAD
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
=======
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
>>>>>>> af93d57b020510be7f81c42046f064f27a79036d
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}