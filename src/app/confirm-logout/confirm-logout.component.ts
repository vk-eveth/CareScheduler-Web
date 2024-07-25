import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-logout',
  standalone: true,
  imports: [],
  templateUrl: './confirm-logout.component.html',
  styleUrl: './confirm-logout.component.css'
})
export class ConfirmLogoutComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmLogoutComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
