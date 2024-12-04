import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'; 
  private adminApiUrl = 'http://localhost:3000/admin'; 
  public jwtHelper = new JwtHelperService(); 
  private alertKey = 'alertShown'; 

  constructor(private http: HttpClient, private router: Router) {}

  
  register(user: { firstName: string; lastName: string; email: string; password: string }): Observable<any> {
    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      return throwError(() => new Error('All fields are required.'));
    }

    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map((response: any) => {
        this.router.navigate(['/login'], {
          queryParams: { message: 'Registration successful! Please log in.' },
        });
        return response;
      }),
      catchError((error) => {
        console.error('Registration failed', error);
        const errorMessage = error.error?.message || 'Registration failed due to an unexpected error.';
        return throwError(() => new Error(errorMessage));
      })
    );
  }

 
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response?.token) {
          sessionStorage.setItem('auth_token', response.token); 

          const returnUrl = this.router.getCurrentNavigation()?.extras?.state?.['returnUrl'] || '/dashboard';
          this.router.navigate([returnUrl]); 
          return response;
        } else {
          throw new Error('Token not found in response.');
        }
      }),
      catchError((error) => {
        console.error('Login failed', error);
        return throwError(() => new Error(error.error?.message || 'Login failed due to an unexpected error.'));
      })
    );
  }

  
  adminLogin(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.adminApiUrl}/login`, credentials).pipe( 
      map((response: any) => {
        if (response?.token) {
          sessionStorage.setItem('auth_token', response.token); 
          console.log('Admin login successful. Token:', response.token);
  
          
          const decodedToken = this.jwtHelper.decodeToken(response.token);
          if (decodedToken?.role === 'admin') {
            const returnUrl = this.router.getCurrentNavigation()?.extras?.state?.['returnUrl'] || '/admin-login/dashboard';
            console.log('Redirecting to:', returnUrl)
            this.router.navigate([returnUrl]); 
          } else {
            this.logout(); 
            this.router.navigate(['/admin-login']);
          }
          
          return response;
        } else {
          throw new Error('Token not found in response.');
        }
      }),
      catchError((error) => {
        console.error('Admin Login failed', error);
        return throwError(() => new Error(error.error?.message || 'Login failed due to an unexpected error.'));
      })
    );
  }
  
  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth_token');
    return token ? !this.jwtHelper.isTokenExpired(token) : false; 
  }

  
  hasAlertBeenShown(): boolean {
    return sessionStorage.getItem(this.alertKey) === 'true';
  }

  
  setAlertShown(value: boolean): void {
    sessionStorage.setItem(this.alertKey, value.toString());
  }

  
  logout(): void {
    sessionStorage.removeItem('auth_token'); 
    this.router.navigate(['/login'], {
      queryParams: { message: 'You have been logged out.' },
    });
  }

  
  isAdmin(): boolean {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.role === 'admin'; 
    }
    return false;
  }

  
  decodeToken(): any {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getUserDetails(): any {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken;
      } catch (error) {
        console.error('Error decoding token', error);
        return null;
      }
    }
    return null;
  }

}
