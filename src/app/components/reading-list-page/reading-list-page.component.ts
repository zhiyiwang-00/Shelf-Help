import { Component } from '@angular/core';
import { Book, BookService} from '../../book.service';

@Component({
  selector: 'app-reading-list-page',
  standalone: false,
  
  templateUrl: './reading-list-page.component.html',
  styleUrl: './reading-list-page.component.css'
})

export class ReadingListPageComponent {
  userCollection: string[] = [];
  userBooks: Book[] = [];
  isLoading: boolean = true;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    const localUserData = localStorage.getItem("user");
    const loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = loggedInUser?.collection;
    
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        // this.userBooks = [];

        this.userBooks = this.userCollection.map(bookTitle =>
          data.find(book => book.title === bookTitle)
        ).filter(book => book !== undefined);
    
        console.log(this.userBooks);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    });
  }

  removeBook(book: Book): void {
    this.userBooks = this.userBooks.filter(b => b.id !== book.id);
    this.userCollection =  this.userCollection?.filter(b => b !== book.title);
    this.bookService.removeBookFromCollection(book, this.userCollection);
  }
  


}
