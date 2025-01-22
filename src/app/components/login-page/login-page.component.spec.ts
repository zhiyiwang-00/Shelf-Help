import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { User } from '../../book.service'; //"User interface"

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




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