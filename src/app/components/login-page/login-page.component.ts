import { Component, OnInit } from '@angular/core';

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
  
  constructor(private userService: UserService) {}
  
    checkAndSaveUser(event: Event): void {
      this.saveUsername(event);
      this.userService.alreadyRegistered(this.username)
    }

    saveUsername(event: Event): void {
      event.preventDefault(); 

      if (this.username) {
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
      } 
    }

}


//Not quiete sure how this should be implemented, so lets do some pseudocode
/*
0: user inputs text
1: action is activated from enter or buttonclick
2: API is fetched and submitted user ID is compared to API-users
3a: On match: proceed to 4
3b: No match: create new user object (send to API), "pass" user data of new user
4: Save user data in local state
5: Navigate to book catalougue page 
*/

//CHANGE NAME OF BOOK.SERVICE???
