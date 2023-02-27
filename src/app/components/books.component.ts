import { Component, OnInit } from '@angular/core';
import { BooksService } from './../../services/books/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookForm: FormGroup;
  books: any;
  isLoading: boolean = false;
  submitted: boolean = false;
  showDialog: boolean = false;
  bookAddFailed: boolean = false;
  bookAddError: String;

  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', Validators.required]
    });
    this.isHandleLoading(true);
    this.booksService.getBooks().subscribe(
      response => {
        this.books = response;
        this.isHandleLoading(false);
      },
      (error: Response) => {
        this.isHandleLoading(false);
        console.log('error : ', error)
      });
  }

  isHandleLoading(status) {
    return this.isLoading = status;
  }

  showDialogBox() {
    this.showDialog = !this.showDialog;
    if (this.showDialog) {
      this.submitted = false;
      this.bookForm.reset();
    }
  }

  get f() { return this.bookForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    let title = this.bookForm.controls.title.value;
    let author = this.bookForm.controls.author.value;
    let book = { title, author };
    this.isHandleLoading(true);
    this.booksService.addBook(book).subscribe(
      response => {
        console.log('response', response)
        // this.books = response;
        this.isHandleLoading(false);
      },
      (error: Response) => {
        this.isHandleLoading(false);
        console.log('error : ', error);
        this.bookAddFailed = true;
        this.bookAddError = 'Error in book add. please try again.';
      });
  }

}
