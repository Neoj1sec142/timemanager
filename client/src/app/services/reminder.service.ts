import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/env';
import { Reminder } from '../models/reminder.model';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {
  private url: string = apiUrl + 'reminders/'
  constructor(private http: HttpClient) { }
  
  getAll(){
    return this.http.get<Reminder[]>(this.url);
  }

  get(id: number){
    return this.http.get<Reminder>(this.url + this.var(id));
  }

  create(reminder: Reminder){
    return this.http.post<Reminder>(this.url, reminder);
  }

  update(reminder: Reminder){
    return this.http.put<Reminder>(this.url + this.var(reminder.id), reminder);
  }

  delete(id: number){
    return this.http.delete<any>(this.url + this.var(id));
  }
  var(val: any){
    return `${val}/`
  }
}
