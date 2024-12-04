import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contactService/contact.service';
import { AuthService } from '../authService/auth.service'; 

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  contactForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private authService: AuthService 
  ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      if (this.authService.isAuthenticated()) {
        this.contactService.sendContactMessage(this.contactForm.value).subscribe(
          response => {
            this.successMessage = 'Message sent successfully!'; 
            this.contactForm.reset(); 
            this.errorMessage = ''; 
          },
          error => {
            this.errorMessage = 'There was an error sending your message. Please try again later.'; 
          }
        );
      } else {
        this.errorMessage = 'You must be logged in to submit this form. Please log in first.'; 
      }
    } else {
      this.errorMessage = 'Please fill out all fields correctly.'; 
    }
  }
  
}
