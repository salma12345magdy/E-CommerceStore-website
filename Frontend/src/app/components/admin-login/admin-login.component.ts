import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { username: this.username, password: this.password };

    this.authService.adminLogin(credentials).subscribe(
      (response: any) => {
        sessionStorage.setItem('auth_token', response.token);
        this.router.navigate(['/admin-login/dashboard']); 
      },
      (error) => {
        
        this.errorMessage = error.error?.message || 'Admin login failed';
        console.error('Admin login failed:', error);
      }
    );
  }
}

