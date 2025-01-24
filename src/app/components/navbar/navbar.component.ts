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

  setLoggedInStatus(){
    let currentUser : User = JSON.parse(localStorage.getItem('user') ?? "{username: \"\"}") 
    let savedUsername : string = currentUser.username
    console.log(savedUsername)
    console.log(savedUsername == "")
    if (savedUsername != null && savedUsername !== ""){ //Checks null/undefined, and ""
      this.loggedIn = true;
      this.username = savedUsername; //OBS: asserts not null/undefined
    } else {
      this.loggedIn = false;
    }
  }

}
