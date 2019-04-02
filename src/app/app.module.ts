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
import { InvitationPageModule } from './invitation/invitation.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ArticlePage } from './newsfeed/article.page';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { GroupPageModule } from './group/group.module';
import { CreateModalComponent } from './group/create-modal/create-modal.component';
import { GroupModalComponent } from './group/group-modal/group-modal.component';
<<<<<<< HEAD
import { GroupMemberPageModule } from './group-member/group-member.module';
import { MenuComponent } from './menu/menu.component'
import { AppService } from './app.service';
=======
import {GroupMemberPageModule} from './group-member/group-member.module';
>>>>>>> front end menu

@NgModule({
  declarations: [
    AppComponent,
    ArticlePage,
  ],
  entryComponents: [GroupModalComponent, CreateModalComponent],
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
    NativeStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}