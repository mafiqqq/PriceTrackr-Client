import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Login } from '../models/login';
import { map, Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Register } from '../models/register';
import { ForgotPassword } from '../models/forgot-password';
import { ResetPassword } from '../models/reset-password';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private tokenKey: string = "PriceTrackr_Token";
  private apiUrl: string = environment.apiUrl;
  private userId: string | null = null;

  login(vm: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/login`, vm, {
      withCredentials: true // Important for preserving cookies across requests
    })
      .pipe(
        map((res) => {
          if (res.result && !res.requiresTwoFactor) {
            this.setToken(res.token);
          }
          return res;
        })
      )
  }

  logout(): Observable<AuthResponse> {
    // Get token before clearing
    const token = this.getToken();

    // Create headers with token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<AuthResponse>(`${this.apiUrl}account/logout`, {}, {headers})
    .pipe(
      map((res) => {
        if (res.result) {
          localStorage.removeItem(this.tokenKey);
        }
        return res;
      })
    )
  }

  logoutLocally(): void{
    localStorage.removeItem(this.tokenKey)
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Get token from storage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Set token from storage
  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
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

  verifyOtp(code: String): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}account/verify-otp`, { code }, {withCredentials: true})
  }

  private retrieveToken(): string | null {
    return localStorage.getItem(this.tokenKey) || null;
  }
}
