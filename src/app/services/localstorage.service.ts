import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get(key) {
    let value = localStorage.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  set(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    return localStorage.removeItem(key);
  }

  clear() {
    return localStorage.clear();
  }

}
