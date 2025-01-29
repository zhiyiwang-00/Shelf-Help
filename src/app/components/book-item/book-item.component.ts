import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../services/book.service';

@Component({
  selector: 'app-book-item',
  standalone: false,

  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})

export class BookItemComponent {
  // constructor(private bookService: BookService) { };

  @Input() book!: Book;
  @Input() collection: string[] = [];
  @Input() version!: 'catalogue' | 'readingList';
  @Input() expandedCardId: number | null = null; 

  @Output() saveBookEvent = new EventEmitter<Book>();
  @Output() removeBookEvent = new EventEmitter<Book>();
  @Output() toggleCardExpansion = new EventEmitter<number>();


  isHoveredOnButton: boolean = false;

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
  
  getStars(rating: number): number[] {    
    rating = Math.round(this.book?.rating || 0); 
    const stars = Array(5)
      .fill(0)
      .map((_, index) => (index < rating ? 1 : 0)); 
    return stars;
  }
}
