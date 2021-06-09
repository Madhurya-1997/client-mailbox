import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from './email';
import { EmailSummary } from './email-summary';

interface EmailRequest {
  id: string,
  to: string,
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private rootUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.rootUrl}/emails`)
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.rootUrl}/emails/${id}`)
  }

  sendEmail(email: Email) {
    return this.http.post<any>(`${this.rootUrl}/emails`, email)
  }

}
