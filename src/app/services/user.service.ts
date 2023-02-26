import { Injectable } from '@angular/core';
import { APIService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private API: APIService) { }

  getUsers() {
    return this.API.get('books');
  }

}
