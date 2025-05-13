import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TwoFactor } from '../../../../core/models/two-factor';

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [
    InputOtpModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './two-factor.component.html',
  styleUrl: './two-factor.component.scss'
})
export class TwoFactorComponent implements OnInit {

  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  countdown: number = 0;
  fb: FormBuilder = inject(FormBuilder);
  otpForm!: FormGroup;

  ngOnInit() {
    this.otpForm = this.fb.group({
      otpValue: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
  }

  verifyOtp() {
    debugger;
    const twoFactor: TwoFactor = {
      otp : this.otpForm.controls['otpValue'].value
    }
    this.authService.verifyOtp(twoFactor).subscribe({
      next: (response) => {
        if (response.result && response.token) {
          this.router.navigate(['/home']);
        } else {
          console.log('Invalid OTP: ', response.message);
        }
      },
      error: (error) => {
        console.log('OTP Verification error: ', error);
      }
    })
  }
}
