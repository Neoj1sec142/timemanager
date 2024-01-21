import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reminder-modal',
  templateUrl: './reminder-modal.component.html',
  styleUrls: ['./reminder-modal.component.css']
})
export class ReminderModal  {
  reminderForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    platform: new FormControl('', Validators.required),
    severity: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(5)])
  });

  constructor(public dialogRef: MatDialogRef<ReminderModal>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSubmit(): void {
    if (this.reminderForm.valid) {
      this.dialogRef.close(this.reminderForm.value);
    }
  }

}
