import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReminderModal } from '../reminder-modal/reminder-modal.component';
import { ReminderService } from 'src/app/services/reminder.service';
import { Reminder } from 'src/app/models/reminder.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // remindersCount: number = 0;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private reminderSvc: ReminderService
  ) { }

  ngOnInit() {
    
  }
  addReminder(){
    const dialogRef = this.dialog.open(ReminderModal, {width: '400px'});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.reminderSvc.create(result).subscribe((res: Reminder) => {
        this.snack.open('Your Reminder has been scheduled', 'Close', { duration: 1500 });
      }, (error: any) => {
        this.snack.open(`Error: ${error}`, 'Close', { duration: 1500 });
      })
    });
  }

  private getReminders(){
    
  }
  private checkNextReminder(){

  }

}
