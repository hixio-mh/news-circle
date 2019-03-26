import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { AuthAPIService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private username: string;
  private password: string;
  private email: string;

  constructor(
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private authService: AuthAPIService
  ) {
    this.username = "";
    this.password = "";
    this.email = "";
  }

  onRegister() {
    let cred = {
      user_name: this.username,
      user_key: this.password,
      user_email: this.email
    }

    this.authService.register(cred).then(
      res => {
        this.router.navigate(['/tabs/tab1']);
      }
    );
  }

  onLogIn() {
    let cred = {
      user_name: this.username,
      user_key: this.password,
      user_email: this.email
    }
    this.authService.logIn(cred).then(
      res => {
        this.router.navigate(['/tabs/tab1']);
      }
    );
  }
}
