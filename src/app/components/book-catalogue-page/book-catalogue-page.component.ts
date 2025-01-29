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
  userCollection: string[] = [];
  loggedInUser: any;
  isLoading: boolean = true;
  expandedCardId: number | null = null;

  constructor(private bookService: BookService, private userService: UserService) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.books = data;
        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;
      }
    });
    const localUserData = localStorage.getItem("user");
    this.loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = this.loggedInUser.collection;
  }

  toggleCardExpansion(bookID: number): void {
    this.expandedCardId = this.expandedCardId === bookID ? null : bookID;
  }



  saveBook(book: Book): void {
    this.userCollection = this.userService.saveBookToCollection(book, this.userCollection);
  }

  removeBook(book: Book): void {
    this.userCollection = this.userService.removeBookFromCollection(book, this.userCollection);
  }


}