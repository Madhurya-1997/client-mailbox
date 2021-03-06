import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {
  showModal: boolean = false;
  email: Email;

  constructor(private authService: AuthService, private emailService: EmailService) {
    this.email = {
      id: '',
      to: '',
      from: `${authService.username}@angular-email.com`,
      subject: '',
      html: '',
      text: ''
    }
  }

  ngOnInit(): void {
  }

  onSubmitEmail(value: Email) {
    return this.emailService.sendEmail(value).subscribe({
      next: (response) => {
        console.log(response)
        this.showModal = false
      },
      error: (err) => {
        alert('Email not sent')
        console.log(err.error)
      }
    })
  }

}
