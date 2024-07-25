import { Component, OnInit } from '@angular/core';
import { Appointment } from '../model/appointment.model';
import { AppointmentService } from '../services/appointment.service';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipe/custom-date.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/AuthService';

@Component({
  selector: 'app-patient-appointment',
  standalone: true,
  providers: [AppointmentService],
  imports: [ CommonModule, PipesModule, HttpClientModule, CommonModule],
  templateUrl: './patient-appointment.component.html',
  styleUrls: ['./patient-appointment.component.css']
})
export class PatientAppointmentComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private appointmentService: AppointmentService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.appointmentService.getAppointmentsByUserId(currentUser.userId).subscribe(data => {
        console.log(data);
        this.appointments = data;
      });
    }
  }

  confirmedAppointments(): Appointment[] {
    return this.appointments.filter(a => a.status === 'confirmed');
  }
  unconfirmedAppointments(): Appointment[] {
    return this.appointments.filter(a => a.status !== 'confirmed');
  }
}