import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

class APIService {
  protected apiUrl;
  protected apiKey = 'thisisanapikey';
  protected http;

  constructor(http: HttpClient, apiLocation: String = "") { 
    this.http = http;
    this.apiUrl = `https://charm-elderly-hook.glitch.me/${apiLocation}`; // Replace with your API endpoint
  };

  ErrorHandelig(error:any, dataType:String = "data") {
    console.error(`Error fetching ${dataType}:`, error);
        return throwError(() => new Error(error));
  }
}

@Injectable()
export class BookService extends APIService {
  constructor(http: HttpClient){
    super(http, "shelf_help_books")};

  getBooks(): Observable<Book[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`  // Add API key to headers
    });
    return this.http.get<Book[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => this.ErrorHandelig(error, "books"))
    );
  }
}

@Injectable()
export class UserService extends APIService {
  constructor(http: HttpClient){
    super(http, "shelf_help_users")};

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`  // Add API key to headers
    });
    return this.http.get<User[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => this.ErrorHandelig(error, "users"))
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

export interface User {
  id: number,
  username: String,
  collection: Book[];
}

