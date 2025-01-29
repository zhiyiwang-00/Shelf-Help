import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const getCurrentUser = (): string => {
    const user = JSON.parse(localStorage.getItem('user') ?? '{"username": ""}');
    return user.username;
};

export const authGuard: CanActivateFn = () => {
    const router = inject(Router);
    const currentUser = getCurrentUser();

    if (currentUser) return true;

    alert('No user registered. Log in to continue helping yourshelf');
    router.navigateByUrl(`/`);
    return false;
};

export const loginGuard: CanActivateFn = () => {
    const router = inject(Router);
    const currentUser = getCurrentUser();

    if (currentUser) {
        alert('No access to login page since you are already logged in');
        router.navigateByUrl(`/book-catalogue`);
        return false;
    }

    // alert('You can access log in');
    return true;
};
