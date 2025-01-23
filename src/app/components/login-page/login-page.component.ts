import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: false,
  
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent{
  username: string = '';

  saveUsername(event: Event): void {
    event.preventDefault(); 

    if (this.username) {
      localStorage.setItem('user', JSON.stringify({ username: this.username }));
    } 
  }

}
