import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }  
}
