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
    if(this.username !== "" ){
      this.isLoading = true;
      this.userService.alreadyRegistered(this.username).subscribe({
        next: (users: User[]) => {
          this.saveUsernameAndNavigate(users);
        },
        error: (error) => {
          console.error("Error in user retrieval", error);
          this.isLoading = false;
        }
      });
    } else{
      alert("Enter a valid username! :(");
    }
  }

  saveUsernameAndNavigate(userArray: User[]): void {
    for (let user of userArray) {
      if (this.username === user.username) {
        localStorage.setItem("user", JSON.stringify(user));
        this.isLoading = false;
        window.location.href = "/book-catalogue";
        return;
      }
    }
  }

}
