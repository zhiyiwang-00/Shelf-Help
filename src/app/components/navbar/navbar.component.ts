import { Component, OnInit } from '@angular/core';

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
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedIn = true;
      this.username = JSON.parse(userData).username;
    } 
  }

}
