import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../../book.service';

@Component({
  selector: 'app-login-page',
  standalone: false,

  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  users: User[] = [];
  username: string = '';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router) { };

  checkAndSaveUser(event: Event): void {
    event.preventDefault();
    this.isLoading = true;
    console.log(this.isLoading);
    

    this.userService.alreadyRegistered(this.username);
    this.username !== ""
      ? this.saveUsernameAndNavigate()
      : console.error("empty string is not a valid username");
  }

  saveUsernameAndNavigate(): void {
    this.userService.getUsers().subscribe((userArray: User[]) => {
      for (let user of userArray) {
        if (this.username === user.username) {
          localStorage.setItem('user', JSON.stringify(user));
          this.isLoading = false;
          // console.log(this.isLoading);
          window.location.href = "/book-catalogue";
        }
      }
    })
    
  }
}
