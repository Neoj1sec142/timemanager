import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClockedTime } from 'src/app/models/clocked-time.model';
import { ClockService } from 'src/app/services/clock.service';

@Component({
  selector: 'app-hours-table',
  templateUrl: './hours-table.component.html',
  styleUrls: ['./hours-table.component.css']
})
export class HoursTableComponent implements OnInit {
  timeCols: string[] = ["Date", "Day", "TimeWorked", "Sittings"]
  timeSrc!: MatTableDataSource<ClockedTime>;
  allTimes: ClockedTime[] = [];
  parsedTimes: ClockedTime[] = [];
  finishedLoading: boolean = false;
  constructor(private clockSvc: ClockService) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.clockSvc.getAll().subscribe((res: ClockedTime[]) => {
      this.allTimes = res;
      console.log(res, "Success")
      this.parsedTimes = this.processTimes(res);
      console.log(this.parsedTimes, "Parsed")
    })
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
}
