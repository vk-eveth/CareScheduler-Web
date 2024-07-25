import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import { User } from "../model/user.model";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/AuthService";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-patient-update-profile',
  standalone: true,
  providers: [UserService, AuthService],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './patient-update-profile.component.html',
  styleUrl: './patient-update-profile.component.css'
})
export class PatientUpdateProfileComponent implements OnInit {
  userForm: FormGroup;
  currentUser: User | null = null;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
      profilePicture: [null]
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.userForm.patchValue({
        username: this.currentUser.username,
        email: this.currentUser.email,
        userPassword: this.currentUser.userPassword
      });
    }
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.userForm.get('username')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    formData.append('userPassword', this.userForm.get('userPassword')?.value);
    if (this.selectedFile) {
      formData.append('profilePicture', this.selectedFile);
    }

    if (this.currentUser) {
      this.userService.updateUser(this.currentUser.userId, formData).subscribe(
        (updatedUser) => {
          this.authService.login(updatedUser.email, updatedUser.userPassword, updatedUser.role).subscribe(() => {
            alert('Profile updated successfully.');
          });
        },
        (error) => {
          console.error('Error updating profile', error);
          alert('An error occurred while updating the profile.');
        }
      );
    }
  }

  onDeleteAccount(): void {
    if (this.currentUser && confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteUser(this.currentUser.userId).subscribe(
        () => {
          this.authService.logout();
          alert('Account deleted successfully.');
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error deleting account', error);
          alert('An error occurred while deleting the account.');
        }
      );
    }
  }
}