import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contactService/contact.service'; 
@Component({
  selector: 'app-view-messages',
  templateUrl: './view-messages.component.html',
  styleUrl: './view-messages.component.css'
})
export class ViewMessagesComponent implements OnInit {
  messages: any[] = []; 
  selectedMessage: any | null = null; 
  errorMessage: string | null = null; 

  constructor(private contactService: ContactService) { } 

  ngOnInit(): void {
    this.loadMessages(); 
  }

  loadMessages(): void {
    this.contactService.getMessages().subscribe(
      (data: any[]) => {
        this.messages = data; 
        this.errorMessage = null; 
      },
      (error) => {
        this.errorMessage = 'Failed to load messages'; 
        console.error('Error loading messages:', error); 
      }
    );
  }

  viewMessage(id: string): void {
    this.contactService.getMessageById(id).subscribe(
      (data: any) => {
        this.selectedMessage = data; 
        this.errorMessage = null; 
      },
      (error) => {
        this.errorMessage = 'Failed to load message details'; 
        console.error('Error loading message details:', error); 
      }
    );
  }

  resetSelectedMessage(): void {
    this.selectedMessage = null; 
  }
}


