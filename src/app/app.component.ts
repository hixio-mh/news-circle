import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { MenuController } from '@ionic/angular';
import { Group } from './models/group.model';
import { AuthAPIService } from './auth/auth.service';
import { AppService } from './app.service';
import { Subject } from 'rxjs';
import { GroupService } from './group/group.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private groups: any;
  private groupsUpdate = new Subject();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private authService: AuthAPIService,
    private appService: AppService,
    private router: Router,
    private groupService: GroupService
  ) {
    this.initializeApp();
    this.groups = [];
    this.groupsUpdate.subscribe(data => {
      this.groups = data;
    })
    
    this.groupService.getGroupUpdated().subscribe(
      updated => {
        this.groupsUpdate.next(updated);
      }
  )
    if (authService.isAuthed()) {
      // If user is authenticated when app start
      let uid = appService.getCurUserId();
      appService.getGroups(uid).then(
        res => {
          this.groups = res;
          this.groupsUpdate.next(this.groups);
        })
    }

    authService.isAuthedUpdate().subscribe(
      // If there's any change to the authentication status
      auth => {
        if (auth) {
          let uid = appService.getCurUserId();
          appService.getGroups(uid).then(
            res => {
              this.groups = res;
              this.groupsUpdate.next(this.groups);
            })
        }
      })
  }

  toGroupNews(gid) {
    this.router.navigate(['/group', gid]);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.router.navigate(['/login']);
      // this.router.navigate(['/newsfeed']);//TEMPORARY to avoid need to login during development

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  }
