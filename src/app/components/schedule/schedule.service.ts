import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  getAppointments() {
    return [
      {
        time: '13:15',
        department: 'Laser',
        patient: 'Neha',
        doctor: 'Ms. Ritu',
        procedure: 'LHR - Full Arms',
        duration: 30
      },
      {
        time: '15:00',
        department: 'Laser',
        patient: 'Sheeba',
        doctor: 'Ms. Ritu',
        procedure: 'LHR - Half Face',
        duration: 15
      },
      {
        time: '15:00',
        department: 'Skin 1',
        patient: 'Pragati',
        doctor: 'Ms. Ritu',
        procedure: 'Yellow Peel',
        duration: 15
      }
    ];
  }
}
