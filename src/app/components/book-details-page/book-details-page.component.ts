import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book, BookService } from '../../book.service';

@Component({
  selector: 'app-book-details-page',
  standalone: false,
  templateUrl: './book-details-page.component.html',
  styleUrl: './book-details-page.component.css'
})

export class BookDetailsPageComponent implements OnInit {
  book: Book | undefined;
  isLoading: boolean = true;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private location: Location 
  ) { }

  ngOnInit() {
    const bookID = +this.route.snapshot.paramMap.get('id')!;
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.book = books.find(book => book.id === bookID);
        console.log(this.book);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching book:', error);
        this.isLoading = false;
      }
    }
  )}

  goBack(): void {
    this.location.back();
  }
}
