import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [UserService, AuthService]
})
export class SignInComponent {
  loginForm: FormGroup;
  notification: string | null = null;
  isError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  alertIfInvalid() {
    if (this.loginForm.invalid) {
      alert('Please fill out the form correctly before submitting.');
    }
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password, remember } = this.loginForm.value;
    const userType = 'Patient';

    this.authService.login(email, password, userType).subscribe(
      (user: User) => {
        //console.log('Login successful', user);
        this.isError = false;
        this.notification = `Welcome, ${user.username}!`;

        setTimeout(() => {
          this.notification = null;
          this.router.navigate(['/patientlayout/patient-dashboard']);
        }, 1500);
      },
      error => {
        console.error('Login error', error);
        this.isError = true;
        this.notification = 'Login failed. Please check your credentials.';

        setTimeout(() => {
          this.notification = null;
        }, 500);
      }
    );
  }

  clearNotification(): void {
    this.notification = null;
  }
}
