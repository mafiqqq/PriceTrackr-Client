import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { PasswordModule } from 'primeng/password';
// import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    CalendarModule,
    CheckboxModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    InputMaskModule,
    InputTextModule,
    TextareaModule,
    MenuModule,
    PanelModule,
    PasswordModule,
    // ToastModule,
    ToggleButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})
export class UpdateProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  securityForm!: FormGroup;
  countries: any[] = [];
  timezones: any[] = [];

  uploadedFile: File | null = null;
  previewImageSrc: string = 'assets/default-avatar.png';

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForms();
    this.loadCountries();
    this.loadTimezones();
  }

  initForms() {
    this.profileForm = this.fb.group({
      firstName: ['John', [Validators.required]],
      lastName: ['Doe', [Validators.required]],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567', [Validators.required]],
      birthday: [new Date('1990-01-15')],
      address: ['123 Main Street'],
      city: ['New York'],
      state: ['NY'],
      country: [null],
      postalCode: ['10001'],
      company: ['Acme Inc.'],
      jobTitle: ['Senior Developer'],
      bio: ['Full-stack developer with 10+ years of experience'],
      website: ['https://johndoe.com'],
      timezone: [null],
      language: ['English']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    });

    this.securityForm = this.fb.group({
      twoFactorEnabled: [true],
      emailNotifications: [true],
      loginAlerts: [true],
      dataSharing: [false]
    });
  }

  loadCountries() {
    // In a real application, this would be a service call
    this.countries = [
      { name: 'United States', code: 'US' },
      { name: 'Canada', code: 'CA' },
      { name: 'United Kingdom', code: 'UK' },
      { name: 'Australia', code: 'AU' },
      { name: 'Germany', code: 'DE' }
    ];
  }

  loadTimezones() {
    // In a real application, this would be a service call
    this.timezones = [
      { name: '(GMT-08:00) Pacific Time', code: 'America/Los_Angeles' },
      { name: '(GMT-05:00) Eastern Time', code: 'America/New_York' },
      { name: '(GMT+00:00) UTC', code: 'UTC' },
      { name: '(GMT+01:00) Central European Time', code: 'Europe/Paris' },
      { name: '(GMT+09:00) Japan Standard Time', code: 'Asia/Tokyo' }
    ];
  }

  onProfileSubmit() {
    console.log("submit");
  }

  onPasswordSubmit() {

  }

  onSecuritySubmit() {
    console.log("submit");
  }

  onFileUpload(event: any) {
    console.log("submit");
  }

  confirmDeleteAccount() {
    console.log("submit");
  }
}
