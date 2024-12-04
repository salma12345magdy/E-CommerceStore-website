import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:3000/contact'; 

  constructor(private http: HttpClient) { }

  sendContactMessage(message: any): Observable<any> {
    return this.http.post(this.apiUrl, message);
  }


  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`); 
  }

  getMessageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`); 
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); 
  }

}
