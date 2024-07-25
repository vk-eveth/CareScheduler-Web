import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [],
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  // users: User[] = [];

  // constructor(private userService: UserService) { }

  // ngOnInit(): void {
  //   // this.getAllUsers();
  // }

  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //       console.log('Users:', this.users);
  //     },
  //     error => {
  //       console.error('Error fetching users:', error);
  //     }
  //   );
  // }
  
  title = 'CareScheduleWeb';
}