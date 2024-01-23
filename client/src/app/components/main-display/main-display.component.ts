import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { ClockedTime } from 'src/app/models/clocked-time.model';
import { Reminder } from 'src/app/models/reminder.model';
import { ClockService } from 'src/app/services/clock.service';
import { ReminderService } from 'src/app/services/reminder.service';
import { ViewReminderComponent } from '../view-reminder/view-reminder.component';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})
export class MainDisplayComponent implements OnInit, OnDestroy {
  reminders: Reminder[] = []; 
  clocked: string = "";
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  
  constructor(
    private reminderSvc: ReminderService,
    private clockSvc: ClockService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    ) { }


  ngOnInit(): void {
    this.pageInit();
  }
  
  
  private pageInit(){
    forkJoin([
      this.clockSvc.getMostRecent(),
      this.reminderSvc.getAll()
    ]).subscribe(([recClock, reminders]) => {
      const inputD = recClock.created_on?.toString()
      if(inputD !== undefined){
        this.clocked = recClock.clock_type;
      }else{
        this.clocked = "OUT";
      }
      this.reminders = reminders;
    })
  }
  
  deleteReminder(reminder: Reminder){
    const dialogRef = this.dialog.open(ConfirmModalComponent, {data: "Are you sure you want to delete this reminder?", width: '450px'})
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result && reminder.id){
        const id = reminder.id;
        this.reminderSvc.delete(id).subscribe(
          (res: any) => {
            this.snack.open(`Reminder Successfully Deleted`, 'Close', { duration: 1500 })    
            this.reminders = this.reminders.filter(r => r.id != id);
            
          }, (error: any) => {
            this.snack.open(`Error: ${error}`, 'Close', { duration: 1500 })    
          })
      }else{
        this.snack.open(`Dialog Closed: ${result ? 'True' : 'False'}`, 'Close', { duration: 1500 })
      }
    })
  }

  viewReminder(reminder: Reminder){
    const dialogRef = this.dialog.open(ViewReminderComponent, {data: reminder, width: '450px'})
    dialogRef.afterClosed().subscribe(() => {
      this.snack.open('Reminder not altered', 'Close', { duration: 1500 })
    })
  }
  
  async handleClock(clockAction: string): Promise<void> {
    const currentTime = new Date();
  
    if (this.clocked === clockAction) {
      return;
    }
  
    if (clockAction === "IN") {
      this.clocked = "IN";
      this.startStopwatch();
      this.snack.open(`You have been clocked in ${currentTime}`, 'Close', { duration: 1500 });
      const clock: ClockedTime = {
        hours: 0, 
        minutes: 0,
        clock_type: this.clocked
      };
      await this.postClockEvent(clock);
    } else if (clockAction === "OUT") {
      this.clocked = "OUT";
      this.stopStopwatch();
      this.snack.open(`You have been clocked out ${currentTime}`, 'Close', { duration: 1500 });
      const clock: ClockedTime = {
        hours: this.hours,
        minutes: this.seconds >= 30 ? this.minutes + 1 : this.minutes,
        clock_type: this.clocked
      };
      await this.postClockEvent(clock);
      this.resetStopwatch(); 
    }
  }
  
  private postClockEvent(clock: ClockedTime): Promise<void> {
    return new Promise((resolve) => {
      this.clockSvc.create(clock).subscribe((res: any) => {
        console.log(res, "Success");
        resolve(res);
      });
    })
  }

  isDateToday(dateInput: string): boolean {
    const inputDate = new Date(dateInput);
    const today = new Date();

    return inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
  }

  // StopWatch
  startStopwatch(): void {
    this.intervalId = setInterval(() => {
      this.seconds++;
      if (this.seconds === 60) {
        this.minutes++;
        this.seconds = 0;
      }
      if (this.minutes === 60) {
        this.hours++;
        this.minutes = 0;
      }
    }, 1000);
  }

  stopStopwatch(): void {
    clearInterval(this.intervalId);
  }

  resetStopwatch(): void {
    this.stopStopwatch();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
  }

  ngOnDestroy(): void {
    this.stopStopwatch();
  }

}
