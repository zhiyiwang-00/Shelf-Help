import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReadingListPageComponent } from './components/reading-list-page/reading-list-page.component';
import { BookCataloguePageComponent } from './components/book-catalogue-page/book-catalogue-page.component';
// import { BookComponent } from './components/book/book.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent }, // Default route
  { path: 'reading-list', component: ReadingListPageComponent },
  { path: 'book-catalogue', component: BookCataloguePageComponent },
  { path: '**', redirectTo: '' }, // Wildcard route for 404 fallback
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
