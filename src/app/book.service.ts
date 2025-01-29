import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

//CHANGE NAME OF BOOK.SERVICE file???

@Injectable({
  providedIn: 'root'
})

@Injectable()
class APIService {
  protected apiUrl;
  protected apiKey = 'thisisanapikey';
  protected http;

  constructor(http: HttpClient, apiLocation: String = "") {
    this.http = http;
    this.apiUrl = `https://charm-elderly-hook.glitch.me/${apiLocation}`; // Replace with your API endpoint
  };

  errorHandelig(error: any, dataType: String = "data") {
    console.error(`Error fetching ${dataType}:`, error);
    return throwError(() => new Error(error));
  }
}

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

@Injectable({ providedIn: 'root' }) //Not sure if I was able to properly provide this functionality
export class UserService extends APIService {
  // private userData = this.getUsers();
  // users$ = this.userData;

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
      console.log("Username input is empty");
      return of([]); // Return an empty observable
    }
  
    return this.getUsers().pipe(
      map((userArray: User[]) => {
        let notRegistered = true;
  
        for (let user of userArray) {
          if (user.username === usernameInput) {
            notRegistered = false;
          }
        }
  
        if (notRegistered) {
          console.log(`NEW USER: ${usernameInput}`);
          return this.registerNewUser(userArray, usernameInput);
        } else {
          console.log(`OLD USER: ${usernameInput}`);
          return userArray;
        }
      }),
      catchError(error => {
        console.error("Error fetching users:", error);
        return of([]); // Handle errors and return an empty list
      })
    );
  }

  registerNewUser(userArray: User[], usernameInput: string): User[] {
    let newUser = {
      id: userArray.length ? userArray[userArray.length - 1].id + 1 : 1,
      username: usernameInput,
      collection: []
    };
  
    const headers = new HttpHeaders({ "x-api-key": `${this.apiKey}` });
  
    this.http.post<User[]>(this.apiUrl, newUser, { headers }).subscribe(data => {
      console.log("User registered successfully:", data);
    });
  
    return [...userArray, newUser]; // Return updated user array
  }


  saveBookToCollection(book: Book, userCollection: string[]): string[] {
    // console.log("save" + book.title);
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
    // console.log("remove" + book.title);
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
        // console.log('User collection updated successfully', data);
      },
      error: (error) => {
        console.error('Error updating user collection', error);
      }
    });
  };

  // checkLoggedInStatus(){
  //   let currentUser : User = JSON.parse(localStorage.getItem('user') ?? "{username: \"\"}") 
  //   let savedUsername : string = currentUser.username
  //   if (savedUsername != null && savedUsername !== ""){ //Checks null/undefined, and ""
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}


//}


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
  username: string,
  collection: Book[];
}

