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

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data;
      console.log(this.books);
    });
  }
  
  // onImageError(event: Event): void {
  //   const target = event.target as HTMLImageElement;
  //   target.src = '../src/assets/placeholder.png'; // Provide a placeholder image path
  //   console.error('Image failed to load:', target.src);
  // }
}