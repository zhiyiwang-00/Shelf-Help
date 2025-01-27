import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../../book.service'; //"User interface"

@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})

export class LoginPageComponent {
  users: User[] = [];
  username: string = '';
  
  constructor(
    private userService: UserService,
    private router: Router) {}

    // ngOnInit(){
    //   localStorage.setItem('user', JSON.stringify({ username: '' }));
    // }
    //Logout feature that did not really work

    checkAndSaveUser(event: Event): void {
      event.preventDefault();

      this.userService.alreadyRegistered(this.username) 
      this.username !== ""
        ? this.saveUsernameAndNavigate()
        : console.log("empty string is not a valid username");
    }

    saveUsernameAndNavigate(): void {
      this.userService.getUsers().subscribe((userArray: User[]) => {
        for (let user of userArray) {
          if (this.username === user.username){
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "/book-catalogue"; 
          }
        } 
      })      
    }
}
