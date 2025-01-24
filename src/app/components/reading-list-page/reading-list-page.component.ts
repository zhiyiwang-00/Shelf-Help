import { Component } from '@angular/core';
import { Book, BookService} from '../../book.service';

@Component({
  selector: 'app-reading-list-page',
  standalone: false,
  
  templateUrl: './reading-list-page.component.html',
  styleUrl: './reading-list-page.component.css'
})

export class ReadingListPageComponent {
  constructor(private bookService: BookService) { }
  userCollection: string[] = [];
  userBooks: Book[] = [];

  ngOnInit() {
    const localUserData = localStorage.getItem("user");
    const loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = loggedInUser?.collection;

    this.bookService.getBooks().subscribe({
      next: (data: Book[]) => {
        this.userBooks = [];

        this.userBooks = this.userCollection.map(title =>
          data.find(book => book.title === title)
        ).filter(book => book !== undefined) as Book[];
    
        console.log(this.userBooks);
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      }
    });
  }

  removeBook(book: Book): void {
    console.log("remove" + book.title);
    
    if(book) {
      // this.currentBook = this.books.find(book => book.id === bookID);
      // // this.savedBook = true;
      // //update book to user api collection/local storage
      this.userBooks = this.userBooks?.filter(b => b !== book);
      this.userCollection = this.userCollection?.filter(b => b !== book.title);
      let removingbook = document.getElementById(book.id.toString());

      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.collection = this.userCollection;
        localStorage.setItem("user", JSON.stringify(user));
        removingbook?.remove();
      } 
    }
  }
  


}
