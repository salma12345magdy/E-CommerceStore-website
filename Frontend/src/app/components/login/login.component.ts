import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService/auth.service'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  private alertShown: boolean = false;  

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = sessionStorage.getItem('auth_token');
    
    if (!token && !this.alertShown) {
      console.log('User needs to log in');
      alert('You need to log in!');  
      this.alertShown = true;  
    }

   
  }
  onLogin(): void {
  const credentials = { email: this.email, password: this.password };

  this.authService.login(credentials).subscribe({
    next: (response) => {
      const token = response.token; // التوكن المُستلم من الخادم
      sessionStorage.setItem('auth_token', token);

      // تحليل التوكن لمعرفة دور المستخدم
      const decodedToken = this.authService.jwtHelper.decodeToken(token);

      const role = decodedToken.role;

      if (role === 'admin') {
        console.log('Welcome, Admin!');
        this.router.navigate(['/dashboard']); 
      } else {
        console.log('Welcome, User!');
        this.router.navigate(['/new-arrivals']); 
      }
    },
    error: (error) => {
      console.error('Login failed', error);
      this.errorMessage = 'Invalid email or password.';
    },
  });
}


  openSignInModal() {
    this.router.navigate(['/login']);
  }
  
  
}