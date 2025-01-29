import { Component, OnInit } from '@angular/core';
import { User } from '../../book.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  username: string = '';

  ngOnInit(): void {
    this.setLoggedInStatus();

    window.addEventListener("storage", () => this.setLoggedInStatus());
  }

  logOut(): void{
    this.loggedIn = false;
    this.username = "invalid-user";
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  setLoggedInStatus(): void{
    try{
    let currentUser : User = JSON.parse(localStorage.getItem('user') ?? JSON.stringify("{username: \"\"}"));
    let savedUsername : string = currentUser.username;
    if (savedUsername != null && savedUsername !== ""){ 

      this.loggedIn = true;
      this.username = savedUsername; 
    } else {
      this.username = "invalid-user"; 
    }} catch { 
      localStorage.removeItem("user"); 
      this.username = "invalid-user"; 
    }

  }
}
