import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-two-factor',
  standalone: true,
  imports: [
    InputOtpModule,
    ButtonModule
  ],
  templateUrl: './two-factor.component.html',
  styleUrl: './two-factor.component.scss'
})
export class TwoFactorComponent {

  countdown: number = 0;
  resendCode() {

  }

  onSubmit() {

  }

  onCancel() {

  }
}
