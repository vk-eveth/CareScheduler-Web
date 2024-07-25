import { Component, ElementRef, ViewChild, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthService } from "../services/AuthService";
import { User } from "../model/user.model";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutComponent } from '../confirm-logout/confirm-logout.component';

@Component({
  selector: 'app-patientlayout',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, RouterModule, HttpClientModule, CommonModule],
  templateUrl: './patientlayout.component.html',
  styleUrl: './patientlayout.component.css'
})
export class PatientlayoutComponent implements OnInit {
  currentUser: User | null = null;
  currentHeader: string = '';
  profilePictureUrl: string | null = null;
  private platformId: Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHeader(event.urlAfterRedirects);
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.currentUser = this.authService.getCurrentUser();
      if (this.currentUser) {
        this.profilePictureUrl = `http://localhost:8080/api/users/profile-picture/${this.currentUser.userId}`;
        console.log('Profile Picture URL:', this.profilePictureUrl);
        this.setupSidebarToggle();
      }
    }
    console.log('Current user:', this.currentUser);
  }

  setupSidebarToggle(): void {
    if (isPlatformBrowser(this.platformId)) {
      const toggleSidebarButton = document.getElementById('toggleSidebar');
      const sidebar = document.querySelector('.sidebar');
      const mainContent = document.querySelector('.main-content');

      if (toggleSidebarButton) {
        toggleSidebarButton.addEventListener('click', () => {
          sidebar?.classList.toggle('sidebar-hidden');
          mainContent?.classList.toggle('full-width');
        });
      }
    }
  }

  updateHeader(url: string): void {
    const path = url.split('/').pop() || '';
    switch (path) {
      case 'patient-dashboard':
        this.currentHeader = 'Dashboard';
        break;
      case 'patient-appointment':
        this.currentHeader = 'My Appointments';
        break;
      case 'patient-book-appointment':
        this.currentHeader = 'Book Appointment';
        break;
      case 'patient-update-profile':
        this.currentHeader = 'My Profile';
        break;
      default:
        this.currentHeader = 'Something Else';
        break;
    }
  }

  logout(): void {
    const dialogRef = this.dialog.open(ConfirmLogoutComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }
}