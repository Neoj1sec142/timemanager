import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClockedTime } from 'src/app/models/clocked-time.model';
import { ClockService } from 'src/app/services/clock.service';

interface HoursItem{
  Date?: Date;
  Day: string;
  TimeWorked: string;
  Sittings: number;
}

@Component({
  selector: 'app-hours-table',
  templateUrl: './hours-table.component.html',
  styleUrls: ['./hours-table.component.css']
})
export class HoursTableComponent implements OnInit {
  timeCols: string[] = ["Date", "Day", "TimeWorked", "Sittings", "Actions"]
  timeSrc!: MatTableDataSource<HoursItem>;
  sittingSrc!: MatTableDataSource<ClockedTime>;
  sittingCols: string[] = ["Type", "Hours", "Minutes", "Actions"]
  selectedTimes: ClockedTime[] = [];
  allTimes: ClockedTime[] = [];
  parsedTimes: ClockedTime[] = [];
  viewSittings: boolean = false;
  constructor(private clockSvc: ClockService) { }



  ngOnInit() {
    this.getData();
  }


  toggleSittingsTable(t: HoursItem){
    if(this.viewSittings && this.selectedTimes.length > 0){
      this.selectedTimes = [];
      this.viewSittings = false;
    }else{
      const date = t.Date?.toString()
      if(!date){return}
      this.allTimes.forEach((t: ClockedTime) => {
        const dateToCheck = t.created_on?.toString()
        if(dateToCheck){
          if(this.datesMatch(date, dateToCheck)){
            this.selectedTimes.push(t)
          }
        }
      })
      this.sittingSrc = new MatTableDataSource<ClockedTime>(this.selectedTimes)
      this.viewSittings = true;
    }
  }

  private getData(){
    this.clockSvc.getAll().subscribe((res: ClockedTime[]) => {
      this.allTimes = res;
      console.log(res)
      this.parsedTimes = this.processTimes(res);
      this.initTable();
    })
  }

  private initTable() {
    let items: HoursItem[] = [];
    this.parsedTimes.forEach((t: ClockedTime) => {
      if(!t.created_on){return}
      const date = new Date(t.created_on);
      const dateString = date.toLocaleDateString(); // format as per your requirement
      const dayString = date.toLocaleString('default', { weekday: 'long' }); // e.g., Monday, Tuesday, etc.
      
      const sittings = this.calculateSittings(dateString);
  
      const item: HoursItem = {
        Date: new Date(dateString),
        Day: dayString,
        TimeWorked: `${t.hours.toString().padStart(2, '0')}:${t.minutes.toString().padStart(2, '0')}`,
        Sittings: sittings
      };
  
      items.push(item);
    });
  
    this.timeSrc = new MatTableDataSource<HoursItem>(items);
  }
  
  private calculateSittings(date: string): number {
    // Assuming `this.allTimes` is an array of ClockedTime objects
    // and each object has a 'created_on' date string and a 'clock_type' indicating IN or OUT
    let sittingsCount = 0;
    let wasPreviouslyClockedIn = false;
  
    this.allTimes.forEach((time) => {
      if(time.created_on)
      if (new Date(time.created_on).toLocaleDateString() === date) {
        if (time.clock_type === "IN" && !wasPreviouslyClockedIn) {
          wasPreviouslyClockedIn = true;
        } else if (time.clock_type === "OUT" && wasPreviouslyClockedIn) {
          sittingsCount++;
          wasPreviouslyClockedIn = false;
        }
      }
    });
  
    return sittingsCount;
  }

  private processTimes(times: ClockedTime[]): ClockedTime[] {
    const groupedByDate: { [date: string]: ClockedTime[] } = {};
    times.forEach((t: ClockedTime) => {
        const dateKey = t.created_on || 'undefined';
        groupedByDate[dateKey.toString()] = groupedByDate[dateKey.toString()] || [];
        groupedByDate[dateKey.toString()].push(t);
    });

    return Object.keys(groupedByDate).map(dateKey => {
        return this.addTimes(groupedByDate[dateKey], dateKey);
    });
}

private addTimes(times: ClockedTime[], dateKey: string): ClockedTime {
    let hours = 0;
    let mins = 0;

    times.forEach((t: ClockedTime) => {
        hours += t.hours;
        mins += t.minutes;
        while (mins >= 60) {
            mins -= 60;
            hours += 1;
        }
    });

    return {
        hours: hours,
        minutes: mins,
        clock_type: "TOTAL",
        created_on: dateKey !== 'undefined' ? new Date(dateKey) : undefined
    };
  }
  private datesMatch(dateStr1: string, dateStr2: string): boolean {
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    return date1.toISOString().split('T')[0] === date2.toISOString().split('T')[0];
  }
}
