import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReadingListPageComponent } from './components/reading-list-page/reading-list-page.component';
import { BookCataloguePageComponent } from './components/book-catalogue-page/book-catalogue-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookService } from './book.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReadingListPageComponent,
    BookCataloguePageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [BookService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
