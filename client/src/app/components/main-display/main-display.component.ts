import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClockedTime } from 'src/app/models/clocked-time.model';
import { ClockService } from 'src/app/services/clock.service';


@Component({
  selector: 'app-main-display',
  templateUrl: './main-display.component.html',
  styleUrls: ['./main-display.component.css']
})
export class MainDisplayComponent implements OnInit, OnDestroy {
  
  clocked: string = "";
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  private intervalId: any;
  
  constructor(
    private clockSvc: ClockService,
    private snack: MatSnackBar
    ) { }


  ngOnInit(): void {
    this.checkClockStatus()
  }

  

  checkClockStatus(){
    this.clockSvc.getMostRecent().subscribe((res: ClockedTime) => {
      const inputD = res.created_on?.toString()
      if(inputD !== undefined){
        this.clocked = res.clock_type;
      }else{
        this.clocked = "OUT";
      }
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
