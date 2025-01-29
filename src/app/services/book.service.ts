import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { APIService } from './api.service';

@Injectable({ providedIn: 'root' })
export class BookService extends APIService {
  constructor(http: HttpClient) {
    super(http, "shelf_help_books")
  };

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      catchError((error) => this.errorHandelig(error, "books"))
    );
  }
}

export interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  coverImg: string;
  rating: number;
  blurb: string;
}


