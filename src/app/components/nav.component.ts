import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AuthService as SocialAuthService } from "angularx-social-login";
import { LocalStorageService } from './../../services/localstorage/localstorage.service';
import * as moduleTypes from '../../models/moduleTypes';
import 'core-js/es6/promise';
import 'zone.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {

  appTitle: string = 'Angular App';
  currentUser: any;
  adminModule = moduleTypes.ADMIN_MODULE;

  constructor(
    public auth: AuthService,
    private socialAuthService: SocialAuthService,
    public localStorageService: LocalStorageService,
  ) {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAuthenticated() {
    return this.auth.isAuthenticated;
  }

  isHasRole(moduleType) {
    return this.auth.isHasRole(moduleType);
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
