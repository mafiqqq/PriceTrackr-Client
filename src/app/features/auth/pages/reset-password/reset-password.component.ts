import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ResetPassword } from '../../../../core/models/reset-password';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    InputGroupAddonModule,
    FloatLabelModule,
    ButtonModule,
    PasswordModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {

  email: string | null = null;
  token: string | null = null;
  headers: HttpHeaders = new HttpHeaders;

  // 1: Inject dependency
  fb: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  route: ActivatedRoute = inject(ActivatedRoute);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['encodedEmail'];
      this.token = params['encodedToken'];
    });

    if (!this.email || !this.token) {
      throw new Error("Email or token is missing.");
    }

    this.headers = new HttpHeaders({
      'X-Email': this.email,
      'X-Token': this.token
    });

    // this.resetPassword(headers);
  }

  // 2. Create FormGroup
  resetPasswordForm: FormGroup = this.fb.group({
    // email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    // token: ['', [Validators.required]]
  });

  // 3. Method
  resetPassword() {
    const resetPasswordModel: ResetPassword = {
      // email: this.resetPasswordForm.controls['email'].value,
      password: this.resetPasswordForm.controls['password'].value,
      confirmPassword: this.resetPasswordForm.controls['confirmPassword'].value,
      // token: this.resetPasswordForm.controls['token'].value
    }
    this.authService.resetPassword(resetPasswordModel, this.headers).subscribe({
      next: (response) => {
        if (response.result) {
          console.log('Reset successful');
        }
      },
      error: (error) => {
        console.log('Reset password failed');
        console.log(error);
      }
    });
  }
}
