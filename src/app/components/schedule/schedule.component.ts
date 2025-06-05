import { Component, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  timeSlots: string[] = [];
  departments: string[] = ['Hair', 'OT 1', 'Laser', 'Skin 1', 'Skin 2', 'Obesity'];
  appointments: any[] = [];
  selectedDate: Date = new Date(); // default to today


  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.timeSlots = this.generateTimeSlots('12:45', '15:30', 15);
    this.appointments = this.scheduleService.getAppointments();
  }

  generateTimeSlots(start: string, end: string, interval: number): string[] {
    const times: string[] = [];
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    let current = new Date();
    current.setHours(startH, startM, 0, 0);
    const endTime = new Date();
    endTime.setHours(endH, endM, 0, 0);

    while (current <= endTime) {
      const hh = current.getHours().toString().padStart(2, '0');
      const mm = current.getMinutes().toString().padStart(2, '0');
      times.push(`${hh}:${mm}`);
      current.setMinutes(current.getMinutes() + interval);
    }
    return times;
  }

  getAppointment(time: string, dept: string): any | null {
    return this.appointments.find(app => app.time === time && app.department === dept);
  }
  goToPreviousDay(): void {
  this.selectedDate.setDate(this.selectedDate.getDate() - 1);
  this.selectedDate = new Date(this.selectedDate); // force change detection
  // Optional: reload appointments if date-specific
}

goToNextDay(): void {
  this.selectedDate.setDate(this.selectedDate.getDate() + 1);
  this.selectedDate = new Date(this.selectedDate); // force change detection
}
}
