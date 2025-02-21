import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Route, Router } from '@angular/router';
import { ResetPassword } from '../../../../core/models/reset-password';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

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
export class ResetPasswordComponent {

  // 1: Inject dependency
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  // 2. Create FormGroup
  resetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    token: ['', [Validators.required]]
  });

  // 3. Method
  resetPassword(){
    const resetPasswordModel: ResetPassword = {
      email: this.resetPasswordForm.controls['email'].value,
      password: this.resetPasswordForm.controls['password'].value,
      confirmPassword: this.resetPasswordForm.controls['confirmPassword'].value,
      token: this.resetPasswordForm.controls['token'].value
    }
    this.authService.resetPassword(resetPasswordModel).subscribe({
      next: (response) => {
        if (response.result){
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
