import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'; 



export const adminAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);
  const token = sessionStorage.getItem('auth_token'); 

  console.log('Token retrieved:', token); 

  if (token) {
    try {
      const decodedToken = jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); 

      if (decodedToken?.role === 'admin' && !jwtHelper.isTokenExpired(token)) {
        console.log('Token is valid, navigation allowed.');
        return true;
      } else {
        console.warn('Invalid role or expired token, navigation denied.');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.warn('No token found, navigation denied.');
  }

  router.navigate(['/admin-login']);
  return false;
};
