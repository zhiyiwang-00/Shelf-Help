import { Component } from '@angular/core';
import { Book, BookService, User, UserService } from '../../book.service';

@Component({
  selector: 'app-book-catalogue-page',
  standalone: false,

  templateUrl: './book-catalogue-page.component.html',
  styleUrl: './book-catalogue-page.component.css'
})

export class BookCataloguePageComponent {
  books: Book[] = [];
  users: User[] = [];
  userCollection: Book[] = [];
  // userCollectionIDs: Set<number> = new Set(); // Use a Set for quick lookup

  isLoading: boolean = true;
  savedBook: boolean = false;
  // bookID: number = 0;
  currentBook?: Book;
  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
        console.log(this.books);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    });


    // this.userService.getUsers().subscribe({
    //   next: (data: User[]) => {
    //     this.users = data;
    //     console.log(this.users);
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching users:', error);
    //   }
    // });


    const localUserData = localStorage.getItem("user");
    const loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    // const loggedInUserApiData = this.users.find(user => user.username === loggedInUser.username)
    // this.userCollection = loggedInUserApiData?.collection.map(book => book.id);
    this.userCollection = loggedInUser?.collection;

    console.log(loggedInUser, this.userCollection);




    // this 

    // this.users.find(user => user.username === localStorage.getItem('user', JSON.stringify({ username: this.username }))

    // this.userCollection = this.users.collection; 


  }


  saveBook(book: Book): void {
    console.log(book);
    if (book) {
      // this.currentBook = this.books.find(book => book === book);
      // if (this.currentBook) {
        // book.saved = true;
        this.userCollection?.push(book);
        // console.log(book);
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          user.collection = this.userCollection;
          localStorage.setItem("user", JSON.stringify(user));
        }
      // }
      // this.savedBook = true;
      //update book to user api collection/local storage
    }

  }

  // checkSavedBook(book: Book): boolean {
  //   // this.userCollection.some(book => book === book.id)
  //   if(this.userCollection?.find((b: Book) => b.id === book.id)){
  //     return true;
  //   }
  //   return false;
  //   // this.books.find(book => this.userCollection.include(book))
  // }

  // //TODO: when click on save button, update api & local storage with book title
  // //TODO?: when load into this page, the saving buttons should fetch with saved book data from user api (collectons)
  // //if the book exist in collection, make savedBook true then disable the button 
  // saveBook(bookID: number): void {
  //   if(bookID) {
  //     this.currentBook = this.books.find(book => book.id === bookID);
  //     // this.savedBook = true;
  //     //update book to user api collection/local storage
  //     this.userCollection?.push(bookID);
  //     const userData = localStorage.getItem("user");
  //     if (userData) {
  //       const user = JSON.parse(userData);
  //       user.collection = this.userCollection;
  //       localStorage.setItem("user", JSON.stringify(user));
  //     }
  //   }
  // }



}