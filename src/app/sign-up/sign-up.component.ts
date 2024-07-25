import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.css'],
  providers: [UserService]
})
export class SignUpComponent {
  signUpForm: FormGroup;
  showSuccess = false;

  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService,
    private router: Router) {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      userPassword: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      profilePicture: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.signUpForm.patchValue({
        profilePicture: file
      });
    }
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = new FormData();
      formData.append('username', this.signUpForm.get('username')?.value);
      formData.append('userPassword', this.signUpForm.get('userPassword')?.value);
      formData.append('email', this.signUpForm.get('email')?.value);
      formData.append('role', this.signUpForm.get('role')?.value);
      if (this.signUpForm.get('profilePicture')?.value) {
        formData.append('profilePicture', this.signUpForm.get('profilePicture')?.value);
      }

      this.userService.createUser(formData).subscribe(
        response => {
          this.toastr.success('User created successfully!');
          this.showSuccess=true;
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 3000); 
        },
        error => {
          alert('Error creating user!');
        }
      );
    }
  }
}