import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book, BookService} from '../../book.service';

@Component({
  selector: 'app-book-item',
  standalone: false,
  
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})

export class BookItemComponent {
  constructor(private bookService: BookService) { };

  // isExpanded: boolean = false;

  // // Method to toggle the expanded state
  // toggleExpand(): void {
  //   this.isExpanded = !this.isExpanded;
  // }

  @Input() book!: Book;
  @Input() collection: string[] = [];
  @Input() version!: 'catalogue' | 'readingList';

  
  @Output() saveBookEvent =  new EventEmitter<Book>();
  @Output() removeBookEvent =  new EventEmitter<Book>();

  saveBook() {
    this.saveBookEvent.emit(this.book);
  }

  removeBook() {
    this.removeBookEvent.emit(this.book);
  }

  checkSavedBook(book: Book): boolean {
    // this.userCollection.some(book => book === book.id)
    if(this.collection?.find(b => b === book.title)){
      return true;
    }
    return false;
    // this.books.find(book => this.userCollection.include(book))
  }

  // @Input() title!: string;
  // @Input() !: string;
  // @Input() title!: string;
  // @Input() title!: string;
  // @Input() title!: string;

 
}
