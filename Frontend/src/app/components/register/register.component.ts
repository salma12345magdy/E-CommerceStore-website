import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newsletter: false
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Registration successful');
        this.router.navigate(['/login'], { queryParams: { message: 'Registration successful! Please log in.' } });
      },
      error => {
        console.error('Registration failed', error);
      }
    );
  }
}
