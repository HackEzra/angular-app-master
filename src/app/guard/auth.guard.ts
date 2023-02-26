import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.auth.currentUserValue;
    if (this.auth.isAuthenticated && currentUser && currentUser.role) {
      // check if route is restricted by role
      if (next.data.roles && next.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.auth.currentUserSubjectNext(null);
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
