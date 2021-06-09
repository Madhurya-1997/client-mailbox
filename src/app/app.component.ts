import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  signedin: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.signedin$.subscribe((response) => {
      this.signedin = response
    })

    this.authService.checkAuth().subscribe(() => {

    })
  }
}
