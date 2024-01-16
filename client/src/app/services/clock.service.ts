import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/assets/env';
import { ClockedTime } from '../models/clocked-time.model';
@Injectable({
  providedIn: 'root'
})
export class ClockService {
  private url: string = apiUrl + 'clock/'
  constructor(private http: HttpClient) { }

  get(display: string){
    return this.http.get<ClockedTime>(this.url + this.var(display))
  }
  getAll(){
    return this.http.get<ClockedTime[]>(this.url)
  }
  create(clock: ClockedTime){
    return this.http.post<ClockedTime>(this.url, clock)
  }
  delete(display: string){
    return this.http.get<any>(this.url + this.var(display))
  }
  getMostRecent(){
    return this.http.get<ClockedTime>(this.url + this.var("recent"))
  }


  
  var(val: any){
    return `${val}/`
  }
}
