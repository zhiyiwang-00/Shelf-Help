import { Component, OnInit } from '@angular/core';
import { User } from '../../book.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  loggedIn: boolean = false;
  username: string = '';

  ngOnInit(): void {
    this.setLoggedInStatus();
    
    window.addEventListener("storage", () => this.setLoggedInStatus());
    
    // const userData = localStorage.getItem('user');
    // console.log(userData)
    // if (userData) {
    //   this.loggedIn = true;
    //   this.username = JSON.parse(userData).username;
    // } 
  }

  setLoggedInStatus(): void{
    let currentUser : User = JSON.parse(localStorage.getItem('user') ?? JSON.stringify("{username: \"\"}"));
    let savedUsername : string = currentUser.username;
    if (savedUsername != null && savedUsername !== ""){ //Checks null/undefined, and "" (even if it cant be its good for remembering during refactor)
      this.loggedIn = true;
      this.username = savedUsername; 
    } else {
      // this.loggedIn = false;
      this.username = "invalid-user"; 
    }
  }

}
