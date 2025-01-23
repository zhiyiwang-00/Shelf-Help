import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { provideHttpClient } from '@angular/common/http';  

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReadingListPageComponent } from './components/reading-list-page/reading-list-page.component';
import { BookCataloguePageComponent } from './components/book-catalogue-page/book-catalogue-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
<<<<<<< HEAD
import { BookService, UserService } from './book.service';
=======
import { BookService } from './book.service';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
>>>>>>> f5d0314 (small fix)

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReadingListPageComponent,
    BookCataloguePageComponent,
    NavbarComponent,
    BookDetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BookService, 
    provideHttpClient(),
    UserService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
