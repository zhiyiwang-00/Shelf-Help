import { Component } from '@angular/core';
import { Book, BookService, User, UserService} from '../../book.service';

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

  constructor(private bookService: BookService, private userService: UserService, ) { }

  ngOnInit() {
    const localUserData = localStorage.getItem("user");
    this.loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = this.loggedInUser?.collection;
    
    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        // this.userBooksData = [];

        this.userBooksData = this.userCollection.map(bookTitle =>
          data.find(book => book.title === bookTitle)
        ).filter(book => book !== undefined);
    
        console.log(this.userBooksData);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
        this.isLoading = false;
      }
    });
  }

  removeBook(book: Book): void {
    this.userBooksData = this.userBooksData.filter(b => b.id !== book.id);
    // this.userCollection =  this.userCollection?.filter(b => b !== book.title);
    this.userCollection = this.userService.removeBookFromCollection(book, this.userCollection);
    // this.userService.updateUserCollection(this.loggedInUser.id, this.userCollection);
  }
  


}
