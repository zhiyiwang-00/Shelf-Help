import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book, BookService } from '../../services/book.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-book-details-page',
  standalone: false,
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})

export class BookDetailsPageComponent implements OnInit {
  book: Book | undefined;
  isLoading: boolean = true;

  userCollection: string[] = [];
  userID: number = 0;

  isSaveMessageVisible: boolean = false;
  isRemoveMessageVisible: boolean = false;

  constructor(
    private bookService: BookService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    const bookID = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.book = books.find(book => book.id === bookID);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching book:', error);
        this.isLoading = false;
      }
    }
    )
    const localUserData = localStorage.getItem("user");
    const loggedInUser = localUserData ? JSON.parse(localUserData) : null;
    this.userCollection = loggedInUser?.collection;
    this.userID = loggedInUser?.id;

  }
  
  getStars(rating: number): number[] {    
    rating = Math.round(this.book?.rating || 0); // Round the rating if needed
    const stars = Array(5)
      .fill(0)
      .map((_, index) => (index < rating ? 1 : 0)); // Fill stars up to the rating

    return stars; 
  }

  goBack(): void {
    this.location.back();
  }

  checkSavedBook(book: Book): boolean {
    if (book) {
      if (this.userCollection.find(bookTitle => book.title === bookTitle)) {
        return true
      }
    }
    return false;
  }

  saveBook(book: Book): void {
    this.userService.saveBookToCollection(book, this.userCollection);

    const saveBookElement = document.getElementById("savebookM");
    if (saveBookElement) {
      saveBookElement.removeAttribute("hidden");
    }

    this.isSaveMessageVisible = true;
    setTimeout(() => {
      this.isSaveMessageVisible = false;
    }, 1000);
  }

  removeBook(book: Book): void {
    this.userCollection = this.userCollection?.filter(b => b !== book.title);
    this.userService.removeBookFromCollection(book, this.userCollection);

    this.isRemoveMessageVisible = true;
    setTimeout(() => {
      this.isRemoveMessageVisible = false;
    }, 1000);
  }
}
