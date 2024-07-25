import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  upcomingAppointments: number = 2;
  totalAppointments: number = 10;
  doctorsVisited: number = 5;

  constructor() { }

  ngOnInit(): void {
    // Initialize component logic here if needed
  }
}
