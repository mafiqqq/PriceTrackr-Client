import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Get the auth token

  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // If token exist clone the request and add token
  if (token)
  {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  // Pass the req through to the next handler and handle errors
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401){
        // Unauthorized - either token expired or invalid
        console.log('Authentication error occured, redirecting to login');
        authService.logoutLocally();
        router.navigate(['/auth/login']);
      }
      return throwError(() => error);
    })
  );
};
