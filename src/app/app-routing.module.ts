import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { ReadingListPageComponent } from './components/reading-list-page/reading-list-page.component';
import { BookCataloguePageComponent } from './components/book-catalogue-page/book-catalogue-page.component';
import { BookDetailsPageComponent } from './components/book-details-page/book-details-page.component';
import { authGuard, loginGuard } from './auth.guard'

export const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate:[loginGuard]}, // Default route
  { path: 'reading-list', component: ReadingListPageComponent, canActivate:[authGuard]},
  { path: 'book-catalogue', component: BookCataloguePageComponent, canActivate:[authGuard]},
  { path: 'book/:id', component: BookDetailsPageComponent, canActivate:[authGuard]},
  { path: '**', redirectTo: '' }, // Wildcard route for 404 fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
