import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AuthService as SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  currentUser: any;

  constructor(
    public auth: AuthService,
    private socialAuthService: SocialAuthService,
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }
  
  get isAuthenticated() {
    return this.auth.isAuthenticated;
  }
  
  logOut() {
    if (this.currentUser.isSocial) {
      this.socialAuthService.signOut().then(() => {
        this.auth.logout();
      });
    } else {
      this.auth.logout();
    }
  }

}
