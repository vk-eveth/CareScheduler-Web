import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiBaseUrl}/api/authenticate`;
  private platformId: Object;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) { 
    this.platformId = platformId;
    // Initialize current user from localStorage if in browser
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        // Optionally log for debugging
        console.log('User loaded from localStorage:', JSON.parse(user));
      }
    }
  }

  login(email: string, password: string, userType: string): Observable<User> {
    return this.http.post<User>(this.apiUrl, { email, userPassword: password, role: userType }).pipe(
      tap((user: User) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Optionally log for debugging
          console.log('User logged in and saved to localStorage:', user);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      // Optionally log for debugging
      console.log('User logged out and removed from localStorage');
    }
  }

  getCurrentUser(): User | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
  
}
