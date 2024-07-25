import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../model/appointment.model';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private apiUrl = 'http://localhost:8080/api/appointments';

  constructor(private http: HttpClient) {}

  bookAppointment(appointmentData: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/book`, appointmentData);
  }

  getAppointmentsByUserId(userId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/patient/${userId}`);
  }

}
