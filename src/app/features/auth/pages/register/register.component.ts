import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { Register } from '../../../../core/models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule, 
    InputGroupAddonModule,
    PasswordModule,
    FloatLabelModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
  // Get the dependency injection
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  register(){
    const registerModel: Register = {
      email: this.registerForm.controls['email'].value,
      username: this.registerForm.controls['username'].value,
      password: this.registerForm.controls['password'].value
    }
    this.authService.register(registerModel).subscribe({
      next: (response) => {
        if (response.result) {
          console.log('Register successful');
        }
      },
      error: (error) => {
        console.log('Registration failed');
        console.log(error);
      }
    });
  }
  
}
