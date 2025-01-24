import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route) => {
    const router = inject(Router)
    if (localStorage.getItem("user")!= null){ //checks for null/undefined
        return true;
    } else {
        alert('No user registered. Log in to continue helping yourshelf');
        router.navigateByUrl(`/}`); 
        return false; 
        }   
}