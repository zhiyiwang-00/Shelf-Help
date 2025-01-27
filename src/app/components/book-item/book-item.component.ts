import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book, BookService } from '../../book.service';

@Component({
  selector: 'app-book-item',
  standalone: false,

  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})

export class BookItemComponent {
  constructor(private bookService: BookService) { };

  @Input() book!: Book;
  @Input() collection: string[] = [];
  @Input() version!: 'catalogue' | 'readingList';


  @Output() saveBookEvent = new EventEmitter<Book>();
  @Output() removeBookEvent = new EventEmitter<Book>();

  isHoveredOnButton: boolean = false;

  @Input() expandedCardId: number | null = null; 
  @Output() toggleCardExpansion = new EventEmitter<number>();

  isExpanded(): boolean {
    return this.expandedCardId === this.book.id;
  }

  onExpandClick(): void {
    this.toggleCardExpansion.emit(this.book.id);
  }

  saveBook() {
    this.saveBookEvent.emit(this.book);
  }

  removeBook() {
    this.removeBookEvent.emit(this.book);
  }

  checkSavedBook(book: Book): boolean {
    if (this.collection?.find(b => b === book.title)) {
      return true;
    }
    return false;
  }



}
