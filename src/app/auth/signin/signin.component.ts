import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.signinForm)
    if (this.signinForm.invalid) {
      return;
    } else {
      this.authService.signin(this.signinForm.value).subscribe({
        next: (response) => {
          // Navigate to InboxHome component
          this.router.navigateByUrl('/inbox')
        },
        error: (err) => {
          if (err.error.password || err.error.username) {
            this.signinForm.setErrors({
              invalidCredentials: true
            })
          }
        }
      })
    }
  }

}
