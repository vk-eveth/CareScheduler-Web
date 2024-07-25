import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model'; // Define User model if not already done
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl= environment.apiBaseUrl + '/api/users';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(userFormData: FormData): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, userFormData);
  }

  // updateUser(id: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  // }
  updateUser(userId: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/upd/${userId}`, formData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/del/${id}`);
  }
}
