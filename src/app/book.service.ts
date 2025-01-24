import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

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

  errorHandelig(error:any, dataType:String = "data") {
    console.error(`Error fetching ${dataType}:`, error);
        return throwError(() => new Error(error));
  }
}

@Injectable({providedIn:'root'})
export class BookService extends APIService {
  
  constructor(http: HttpClient){
    super(http, "shelf_help_books")};

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      catchError((error) => this.errorHandelig(error, "books"))
    );
  }
}

@Injectable({providedIn:'root'}) //Not sure if I was able to properly provide this functionality
export class UserService extends APIService {

  constructor(http: HttpClient){
    super(http, "shelf_help_users")};
  
  // private userData = this.getUsers();
  // users$ = this.userData;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      catchError((error) => this.errorHandelig(error, "users"))
    );
  }

  alreadyRegistered(usernameInput: String): void{
    if (usernameInput !== ""){
    this.getUsers().subscribe((userArray: User[]) => {
        // console.log(userArray)
        let notRegistered: boolean = true;
        for (var user of userArray){
          if (user.username === usernameInput){
            notRegistered = false;
          }
        }
        // console.log(isRegistered)
        if (notRegistered){
          console.log(`NEW USER ${usernameInput}`);
          this.registerNewUser(userArray, usernameInput)
        } else {
          console.log(`OLD USER ${usernameInput}`);
        //navigate
        }
      });
    } else {
      console.log("empty string is not a valid username")
    }
  }

  registerNewUser(userArray : User[], usernameInput: String): void{
    let newUser = 
    {
      id: userArray[userArray.length - 1].id + 1,
      username: usernameInput,
      collection: []
    }
    const headers = new HttpHeaders({
      "x-api-key": `${this.apiKey}`  // Add API key to headers
    });
    this.http.post<User[]>(this.apiUrl, newUser, { headers }).subscribe(data => { //Will assume this as next?  /NEED PASSCODE
      console.log('Updated data', data)});
    //Navigate?
  }

  // saveBook(bookTitle: string): Observable<string[]>{
  //   // const headers = new HttpHeaders({
  //   //   'Authorization': `Bearer ${this.apiKey}`  // Add API key to headers
  //   // });
  //   // return this.http.get<User[]>(this.apiUrl, { headers }).pipe(
  //   //   catchError((error) => this.ErrorHandelig(error, "users"))
  //   // );
  //   this.getUserByName()
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
  saved: boolean
}

export interface User {
  id: number,
  username: String,
  collection: Book[];
}

