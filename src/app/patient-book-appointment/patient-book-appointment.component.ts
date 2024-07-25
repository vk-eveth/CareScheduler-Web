import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../services/doctor.service';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../model/appointment.model';
import { Doctor } from '../model/doctor.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-patient-book-appointment',
  standalone: true,
  providers: [AppointmentService, UserService, DoctorService],
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './patient-book-appointment.component.html',
  styleUrl: './patient-book-appointment.component.css'
})
export class PatientBookAppointmentComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedSpecialty: string = 'Any';
  visitReason: string = '';
  appointmentDateTime: string = '';
  bookingMessage: string = '';
  showSuccess = false;
  showUnSuccess=false;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getAllDoctors().subscribe(
      (doctors) => {
        this.doctors = doctors;
      },
      (error) => {
        // console.error('Error fetching doctors:', error);
        alert('Error fetching doctors:')
      }
    );
  }

  bookAppointment(doctor: Doctor): void {
    const patientId = this.getCurrentUserId();

    const appointmentData: Appointment = {
      appointmentId: 0,
      patientId: patientId,
      doctor: doctor,
      appointmentDateTime: new Date(this.appointmentDateTime),
      reasonForVisit: this.visitReason,
      status: 'Pending',
      additionalNotes: '',
      sessionStartTime: new Date(),
      sessionEndTime: new Date()
    };

    this.appointmentService.bookAppointment(appointmentData).subscribe(
      (response) => {
        this.toastr.success('Appointment booked successfully:');
        this.showSuccess=true;
        setTimeout(() => {
          this.router.navigate(['patient-appointment']);
        }, 3000);  // Navigate to appointment list or confirmation page
      },
      (error) => {
        console.error('Error booking appointment:', error);
        this.showUnSuccess=true;
      }
    );
  }

  filterDoctors(): void {
    // Implement filtering logic based on selectedSpecialty
    if (this.selectedSpecialty !== 'Any') {
      this.doctors = this.doctors.filter(doctor => doctor.specialty === this.selectedSpecialty);
    }
  }

  clearFilters(): void {
    this.selectedSpecialty = 'Any';
    this.filterDoctors();
    this.fetchDoctors();
  }

  getCurrentUserId(): number {
    const currentUser = this.authService.getCurrentUser(); // Get current user from AuthService
    if (currentUser) {
      // Assuming your AuthService returns a User object with an ID property
      return currentUser.userId; // Adjust based on your actual User object structure
    }
    return 0; // Default to 0 or handle gracefully if user is not found
  }
}