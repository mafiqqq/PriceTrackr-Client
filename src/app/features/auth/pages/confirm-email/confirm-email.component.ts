import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    RouterModule,
    CardModule
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss'
})
export class ConfirmEmailComponent implements OnInit {
  
  email: string | null = null;
  token: string | null = null;
  
  route: ActivatedRoute = inject(ActivatedRoute);
  http: HttpClient = inject(HttpClient);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.email = params['encodedEmail'];
      this.token = params['encodedToken'];
    });

    if(!this.email || !this.token){
      throw new Error("Email or token is missing.");
    }

    const headers = new HttpHeaders({
      'X-Email': this.email,
      'X-Token': this.token
    });

   this.confirmEmail(headers);
  }

  confirmEmail(headers: HttpHeaders){
    this.authService.confirmEmail(headers).subscribe({
      next: (response) => {
        if (response.result) {
          console.log('Email confirmed');
        }
      },
      error: (error) => {
        console.log('Email confirmation failed');
      }
    })
  }
}
