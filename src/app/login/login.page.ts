import { Component, OnInit } from '@angular/core';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import {AuthAPIService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private username: string;
  private password: string;

  constructor(
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private authService: AuthAPIService
  ) {
    this.username = "";
    this.password = "";
  }

  onLogIn() {
    let cred = {
      username: this.username,
      password: this.password
    }
    this.authService.login(cred);
  }
}
