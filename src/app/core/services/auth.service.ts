import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Register } from '../models/register';
import { ForgotPassword } from '../models/forgot-password';
import { ResetPassword } from '../models/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http: HttpClient = inject(HttpClient);
  tokenKey: string = "PriceTrackr_Token";
  apiUrl: string = environment.apiUrl;

  login(vm: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/login`, vm)
      .pipe(
        map((res) => {
          if (res.result) {
            localStorage.setItem(this.tokenKey, res.token);
          }
          return res;
        })
      )
  }

  register(vm: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/register`, vm)
      .pipe(
        map((res) => {
          if (res.result) {
            console.log('register email sent');
          }
          return res;
        })
      )
  }

  forgotPassword(vm: ForgotPassword): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/forgot-password`, vm)
      .pipe(
        map((res) => {
          if (res.result) {
            console.log('Forgot password email sent');
          }
          return res;
        })
      )
  }

  resetPassword(vm: ResetPassword, headers: HttpHeaders): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/reset-password`, vm, { headers })
      .pipe(
        map((res) => {
          if (res.result) {
            console.log('Password reset successfully');
          }
          return res
        })
      )
  }

  confirmEmail(headers: HttpHeaders): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}account/confirm-email`, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private retrieveToken(): string | null {
    return localStorage.getItem(this.tokenKey) || null;
  }
}
