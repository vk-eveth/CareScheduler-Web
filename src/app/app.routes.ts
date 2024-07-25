  import { NgModule } from '@angular/core';
  import { RouterModule, Routes } from '@angular/router';
  import { LayoutComponent } from './layout/layout.component';
  import { IndexComponent } from './index/index.component';
  import { AboutComponent } from './about/about.component';
  import { ContactComponent } from './contact/contact.component';
  import { SignInComponent } from './sign-in/sign-in.component';
  import { SignUpComponent } from './sign-up/sign-up.component';
  import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
  import { PatientAppointmentComponent } from './patient-appointment/patient-appointment.component';
  import { PatientBookAppointmentComponent } from './patient-book-appointment/patient-book-appointment.component';
  import { PatientlayoutComponent } from './patientlayout/patientlayout.component';
  import { ConfirmLogoutComponent } from './confirm-logout/confirm-logout.component';
  import { PatientUpdateProfileComponent } from './patient-update-profile/patient-update-profile.component'

  export const routes: Routes = [
    { path: '',
      component: LayoutComponent,
      children: [
        { path: '', component: IndexComponent },
        { path: 'about', component: AboutComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'sign-in', component: SignInComponent },
        { path: 'sign-up', component: SignUpComponent },
      ]
    },
    
    {
      path: 'patientlayout',
      component: PatientlayoutComponent,
      children: [
        { path: 'patient-dashboard', component: PatientDashboardComponent },
        { path: 'patient-appointment', component: PatientAppointmentComponent },
        { path: 'patient-book-appointment', component: PatientBookAppointmentComponent },
        { path: 'patient-update-profile', component: PatientUpdateProfileComponent },
        { path: 'confirm-logout', component: ConfirmLogoutComponent}
      ]
    },

    
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })


  export class AppRoutingModule { }
