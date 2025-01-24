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
  
  collection: Book[] = [];
  books: Book[] = [];

  ngOnInit() {
    const localUserData = localStorage.getItem("user");
    const loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    // const loggedInUserApiData = this.users.find(user => user.username === loggedInUser.username)
    // this.userCollection = loggedInUserApiData?.collection.map(book => book.id);
    this.collection = loggedInUser?.collection;
    // console.log(this.collection);


    // this.bookService.getBooks().subscribe({
    //   next: (data: Book[]) => {
    //     // this.books = data;
    //     // console.log(this.books);
    //     // this.isLoading = false;
    //     data.map(book => {
    //       if (this.collection.includes(book)) {
    //         this.books.push(book);
    //       }
    //     })
    //   },
    //   error: (error: any) => {
    //     console.error('Error fetching books:', error);
    //   }
    // });
  }

  removeBook(book: Book): void {
    console.log("remove" + book.title);
    
    if(book) {
      // this.currentBook = this.books.find(book => book.id === bookID);
      // // this.savedBook = true;
      // //update book to user api collection/local storage
      this.collection = this.collection?.filter(b => b !== book);
      let removingbook = document.getElementById(book.id.toString());

      const userData = localStorage.getItem("user");
      if (userData) {
        const user = JSON.parse(userData);
        user.collection = this.collection;
        localStorage.setItem("user", JSON.stringify(user));
        removingbook?.remove();
      } 
    }
  }
  


}
