import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../utils/User';

import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap } from 'rxjs/operators';
import { tokenGetter } from '../utils/tokenGetter';
import { HttpGetTokenResponse } from '../utils/HttpGetTokenResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private helper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.helper = new JwtHelperService();
  }

  signUp(user: User): Observable<User> {
    const url = `${environment.baseURL}/auth/signup`;
    return this.http.post<User>(url, user);
  }

  signIn(user: User): Observable<HttpGetTokenResponse> {
    const url = `${environment.baseURL}/auth/signin`;
    return this.http.post<HttpGetTokenResponse>(url, user).pipe(
      tap(tokenObj => {
        localStorage.setItem('access_token', tokenObj.accessToken);
      })
    );
  }

  logOut(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['auth']);
  }

  isUserAuthenticated(): boolean {
    const existingToken = tokenGetter();
    return existingToken && !this.helper.isTokenExpired(existingToken);
  }
}