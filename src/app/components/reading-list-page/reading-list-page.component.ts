import { Component } from '@angular/core';
import { Book, BookService, } from '../../services/book.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reading-list-page',
  standalone: false,
  templateUrl: './reading-list-page.component.html',
  styleUrl: './reading-list-page.component.css'
})

export class ReadingListPageComponent {
  userCollection: string[] = [];
  userBooksData: Book[] = [];
  isLoading: boolean = true;
  loggedInUser: any;
  expandedCardId: number | null = null;

  constructor(private bookService: BookService, private userService: UserService,) { }

  ngOnInit() {
    const localUserData = localStorage.getItem("user");
    this.loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = this.loggedInUser?.collection;

    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.userBooksData = this.userCollection.map(bookTitle =>
          data.find(book => book.title === bookTitle)
        ).filter(book => book !== undefined);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    });
  }

  toggleCardExpansion(bookID: number): void {
    this.expandedCardId = this.expandedCardId === bookID ? null : bookID;
  }

  removeBook(book: Book): void {
    this.userBooksData = this.userBooksData.filter(b => b.id !== book.id);
    this.userCollection = this.userService.removeBookFromCollection(book, this.userCollection);
  }
}
