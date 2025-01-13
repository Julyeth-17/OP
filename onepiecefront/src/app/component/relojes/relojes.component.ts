import { Component, OnInit } from '@angular/core';
import { ZonashorariasService } from 'src/app/services/zonashorarias.service';
import { ColDef } from 'ag-grid-community';
import { columnDefs } from './timezones-columns';

@Component({
  selector: 'app-relojes',
  templateUrl: './relojes.component.html',
  styleUrls: ['./relojes.component.css'],
  standalone: false
})
export class RelojesComponent implements OnInit {

  utcNow: string = '';
  currentTimes: { [key: string]: string } = {};
  selectedDate: string = '';
  newTimezone: string = '';

  public timezones: any[] = [];
  public colDefs: ColDef[]=[] = columnDefs;
  public themeClass: string = "ag-theme-quartz";


  constructor(private timezoneService: ZonashorariasService) {}

  ngOnInit(): void {
    this.loadTimezones();
    setInterval(() => this.updateTimes(), 1000);
  }

  loadTimezones() {
    this.timezoneService.getTimezones().subscribe((data: any) => {
      this.timezones = data;
      this.updateTimes();
    });
  }

  updateTimes() {
    this.currentTimes = {};
    const baseTime = this.selectedDate ? new Date(this.selectedDate) : new Date();

    this.timezones.forEach((tz) => {
      this.currentTimes[tz.name] = this.convertToTimezone(baseTime, tz.name);
    });

    this.timezones = this.timezones.map((tz) => ({
      ...tz,
      currentTime: this.currentTimes[tz.name],
    }));
  }

  convertToTimezone(date: Date, timezone: string): string {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday:'long',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,

    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.updateTimes();
  }

  // updateTimes() {
  //   this.timezones.forEach((zone: any) => {
  //     this.currentTimes[zone.name] = this.timezoneService.getCurrentTime(zone.name);
  //   });
  // }

  addTimezone() {
    this.timezoneService.addTimezones(this.newTimezone).subscribe(() => {
      this.newTimezone = '';
      this.loadTimezones();
    });
  }

  removeTimezone(id: string) {
    this.timezoneService.deleteTimezones(id).subscribe(() => {
      this.loadTimezones();
    });
  }

  onCellClicked(event: any) {
    const action = event.event.target?.dataset?.action;
    if (action === 'delete') {
      this.removeTimezone(event.data._id);
    }
  }
}

