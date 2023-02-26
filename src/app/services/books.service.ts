import { Injectable } from '@angular/core';
import { APIService } from '../http/api.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private API: APIService) { }

  getBooks() {
    return this.API.get('books');
  }

  addBook(data) {
    return this.API.post('books', data);
  }
}
