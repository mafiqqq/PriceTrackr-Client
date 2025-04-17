import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Login } from '../../../../core/models/login';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupAddonModule,
    PasswordModule,
    FloatLabelModule,
    RouterModule,
    DividerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // loginForm: FormGroup = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl('')
  // })

  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  login() {
    const loginModel: Login = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    }
    this.authService.login(loginModel).subscribe({
      next: (response) => {
        if (response.result) {
          console.log('Login succesful');
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        console.log('Login failed');
        console.log(error);
      }
    });
  }


}
