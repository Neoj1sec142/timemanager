import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Reminder } from 'src/app/models/reminder.model';

@Component({
  selector: 'app-view-reminder',
  templateUrl: './view-reminder.component.html',
  styleUrls: ['./view-reminder.component.css']
})
export class ViewReminderComponent {
  constructor(private dialogRef: MatDialogRef<ViewReminderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reminder) { }
  
  onClose(){
    this.dialogRef.close();
  }
}
