import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent {
  @Input() email: Email;
  showModal: boolean = false;

  constructor(private emailService: EmailService) {

  }

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      text: `\n\n\n----------- ${this.email.from} wrote: \n${this.email.text}`
    }
  }

  onReplyEmail(email: Email) {
    this.emailService.sendEmail(email).subscribe({
      next: (response) => {
        this.showModal = false;
      },
      error: (err) => {
        alert('You Email was not replied')
        console.log(err.error)
      }
    })
  }

}
