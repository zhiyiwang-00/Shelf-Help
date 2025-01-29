import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { APIService } from './api.service';
import { Book } from './book.service';

@Injectable({ providedIn: 'root' })
export class UserService extends APIService {
  constructor(http: HttpClient) {
    super(http, "shelf_help_users")
  };


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error) => this.errorHandelig(error, "users"))
    );
  }


  alreadyRegistered(usernameInput: string): Observable<User[]> {
    if (!usernameInput) {
      return of([]); // Return an empty observable
    }

    return this.getUsers().pipe(
      switchMap((userArray: User[]) => {
        let isNewUser = !userArray.some(user => user.username === usernameInput);

        if (isNewUser) {
          // console.log(`NEW USER: ${usernameInput}`);
          return this.registerNewUser(userArray, usernameInput);
        } else {
          // console.log(`OLD USER: ${usernameInput}`);
          return of(userArray); // Just return the existing users
        }
      }),
      catchError(error => {
        console.error("Error checking registration:", error);
        return of([]);
      })
    );
  }

  registerNewUser(userArray: User[], usernameInput: string): Observable<User[]> {
    let newUser = {
      id: userArray.length ? userArray[userArray.length - 1].id + 1 : 1,
      username: usernameInput,
      collection: []
    };

    const headers = new HttpHeaders({ "x-api-key": `${this.apiKey}` });

    return this.http.post<User>(this.apiUrl, newUser, { headers }).pipe(
      switchMap(() => this.getUsers()), // Fetch the updated users list
      tap(updatedUsers => console.log("Updated user list:", updatedUsers)),
      catchError(error => {
        console.error("Error registering user:", error);
        return of(userArray); // Return the old list if an error occurs
      })
    );
  }


  saveBookToCollection(book: Book, userCollection: string[]): string[] {
    if (book) {
      userCollection.push(book.title);
      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.collection = userCollection;
        localStorage.setItem("user", JSON.stringify(user));
        this.updateCollectionToApi(user.id, userCollection);
      }
    }
    return userCollection;
  }


  removeBookFromCollection(book: Book, userCollection: string[]): string[] {
    userCollection = userCollection?.filter(b => b !== book.title);
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      user.collection = userCollection;
      localStorage.setItem("user", JSON.stringify(user));
      this.updateCollectionToApi(user.id, userCollection);
    }
    return userCollection;
  }


  updateCollectionToApi(userID: number, updatedUserCollection: string[]): void {
    const headers = new HttpHeaders({
      "x-api-key": `${this.apiKey}`
    });

    let body = { collection: updatedUserCollection };

    this.http.patch<{ collection: string[] }>(`${this.apiUrl}/${userID}`, body, { headers }).subscribe({
      next: () => {
      },
      error: (error) => {
        console.error('Error updating user collection', error);
      }
    });
  };
}

export interface User {
  id: number,
  username: string,
  collection: Book[];
}