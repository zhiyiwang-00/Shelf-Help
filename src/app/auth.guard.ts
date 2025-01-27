import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';

export const authGuard: CanActivateFn = () => { //we dont need to declare route as we always navigate to login when the condition is false
    const router: Router = inject(Router)
    let currentUser = JSON.parse(localStorage.getItem('user') ?? JSON.stringify("{username: \"\"}")) 
    currentUser = currentUser.username
    if (currentUser != null && currentUser != ""){ //checks for null/undefined and "" (only last one needed in current version)
        return true;
    } else {
        alert('No user registered. Log in to continue helping yourshelf');
        router.navigateByUrl(`/`); 
        return false; 
        }   
}