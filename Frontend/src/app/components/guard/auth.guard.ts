import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth_token'); 
  
  if (token) {
    return true;
  } else {
    router.navigate(['/login']), {returnParams: { returnUrl: state.url}};
    return false;
  }
};

