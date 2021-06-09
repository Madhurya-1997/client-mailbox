import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface UsernameAvailableResponse {
  available: boolean
}

interface SignupCredentials {
  username: string, password: string, passwordConfirmation: string
}

interface SignupResponse {
  username: string
}

interface SignedinResponse {
  authenticated: boolean, username: string
}

interface SigninCredentials {
  username: string, password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private rootUrl = environment.api_url;
  signedin$ = new BehaviorSubject(null);
  username: string = '';

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string) {
    return this.http.post<UsernameAvailableResponse>(`${this.rootUrl}/auth/username`,
      {
        username: username
      })
  }

  signup(credentials: SignupCredentials) {
    return this.http.post<SignupResponse>(`${this.rootUrl}/auth/signup`, credentials, {
      // withCredentials: true
    })
      .pipe(
        map((response) => {
          this.signedin$.next(true)
          this.username = response.username
        })
      );
  }

  checkAuth() {
    return this.http.get<SignedinResponse>(`${this.rootUrl}/auth/signedin`, {
      // withCredentials: true
    })
      .pipe(
        tap(({ authenticated }) => {
          this.signedin$.next(authenticated);
        })
      )
  }

  signout() {
    return this.http.post(`${this.rootUrl}/auth/signout`, {})
      .pipe(
        tap(() => {
          this.signedin$.next(false)
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<SigninCredentials>(`${this.rootUrl}/auth/signin`, credentials)
      .pipe(
        tap((response) => {
          this.signedin$.next(true)
          this.username = response.username
        })
      )
  }
}
