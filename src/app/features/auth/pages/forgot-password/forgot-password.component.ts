import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ForgotPassword } from '../../../../core/models/forgot-password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    InputGroupAddonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  // (1) Get dependency injection
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  // (2) Build FormGroup
  forgotPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  // (3) Method call
  forgotPassword(){
    const forgotPasswordModel: ForgotPassword = {
      email: this.forgotPasswordForm.controls['email'].value
    }
    this.authService.forgotPassword(forgotPasswordModel).subscribe({
      next: (response) => {
        if (response.result) {
          console.log('Forgot Password successful')
        }
      },
      error: (error) => {
        console.log('Forgot Password failed');
        console.log(error);
      }
    })
  }
}
