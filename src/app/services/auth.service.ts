import { Injectable } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService } from '../http/api.service';
import { LocalStorageService } from '../localstorage/localstorage.service';
import { ModuleUser } from './../../models/moduleUser';
import * as moduleTypes from '../../models/moduleTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public routeData: any;

  constructor(
    private API: APIService,
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.localStorageService.get('user'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
      }
    });
  }

  public get isAuthenticated(): boolean {
    const token = this.localStorageService.get('token');
    if (token) {
      return true;
    } else {
      this.currentUserSubjectNext(null);
      return false;
    }
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public get isHasRoleCheck(): boolean {
    let user = this.currentUserValue;
    if (this.isAuthenticated) {
      if (user && user.role && this.routeData && this.routeData.roles && this.routeData.roles.indexOf(user.role) === -1) {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isHasRole(type): boolean {
    let user = this.currentUserValue;
    if (this.isAuthenticated) {
      let role = user && user.role ? user.role : null;
      switch (type) {
        case moduleTypes.ADMIN_MODULE:
          return ModuleUser.AdminModule.includes(role) ? true : false;
        default:
          return false;
      }
    } else {
      return false;
    }
  }

  currentUserSubjectNext(value): any {
    return this.currentUserSubject.next(value);
  }

  login(data) {
    return this.API.post('auth/login', data);
  }

  logout() {
    // remove user from local storage to log user out
    this.localStorageService.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
  }

}
