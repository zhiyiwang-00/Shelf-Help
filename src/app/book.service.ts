import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl = 'https://charm-elderly-hook.glitch.me/shelf_help_books'; // Replace with your API endpoint
  private apiKey = 'thisisanapikey';

  constructor(private http: HttpClient) { };

  getBooks(): Observable<Book[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.apiKey}`  // Add API key to headers
    });
    return this.http.get<Book[]>(this.apiUrl, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching books:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  // getBookById(id: number): Observable<Book> {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.apiKey}`  // Add API key to headers
  //   });
  //   return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers }).pipe(
  //     catchError((error) => {
  //       console.error('Error fetching book:', error);
  //       return throwError(() => new Error(error));
  //     })
  //   );
  // }
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


