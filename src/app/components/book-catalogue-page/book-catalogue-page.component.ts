import { Component } from '@angular/core';
import { Book, BookService } from '../../book.service';

@Component({
  selector: 'app-book-catalogue-page',
  standalone: false,

  templateUrl: './book-catalogue-page.component.html',
  styleUrl: './book-catalogue-page.component.css'
})

export class BookCataloguePageComponent {
  books: Book[] = [];
  userCollection: Book[] = [];
  isLoading: boolean = true;
  savedBook: boolean = false;
  // bookID: number = 0;
  currentBook?: Book;
  constructor(private bookService: BookService) { }

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
  }

  checkSavedBook(): void{
    // this.userCollection.some(book => book === book.id)

    
    // this.books.find(book => this.userCollection.include(book))
  }

  //TODO: when click on save button, update api & local storage with book title
  //TODO?: when load into this page, the saving buttons should fetch with saved book data from user api (collectons)
  //if the book exist in collection, make savedBook true then disable the button 
  saveBook(bookID: number): void {
    if (bookID) {
      this.currentBook = this.books.find(book => book.id === bookID);
      this.savedBook = true;
      //update book to user api collection/local storage
    } 
  }

}