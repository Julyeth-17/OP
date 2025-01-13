import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZonashorariasService {

  url = 'http://localhost:3000/api/v1'

  constructor(private http: HttpClient) { }

  getTimezones(){
    return this.http.get(`${this.url}/timezones`);
  }

  addTimezones(name: string) {
    return this.http.post(`${this.url}/timezones`, { name });
  }

  deleteTimezones(id: string){
    return this.http.delete(`${this.url}/timezones/${id}`);
  }

  getCurrentTime(zone: string){
    const nowDate = new Date();
    return new Intl.DateTimeFormat('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(nowDate)
  }
}
