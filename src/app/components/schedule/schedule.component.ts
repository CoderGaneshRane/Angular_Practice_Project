import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare var bootstrap: any;

interface Appointment {
  time: string;
  department: string;
  patient: string;
  doctor: string;
  procedure: string;
  duration: number; // in minutes
}
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent implements OnInit {
  timeSlots: string[] = [];
  departments: string[] = [];
  appointments: Appointment[] = [];
  selectedDate: Date = new Date();
  @ViewChild('detailsModal', { static: false }) detailsModal!: ElementRef;

  constructor() {}
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.timeSlots = this.generateTimeSlots('09:00', '15:00', 30);
    this.departments = [
      'Hair',
      'OT 1',
      'Laser',
      'Skin 1',
      'Skin 2',
      'Obesity',
      'test1',
      'test2',
      'test3',
    ];
    this.appointments = this.getAppointments();
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
    console.log(times);
    return times;
  }

  getAppointments(): Appointment[] {
    return [
      {
        time: '11:00',
        department: 'Laser',
        patient: 'Vinaya',
        doctor: 'Dr. Pooja',
        procedure: 'Consultation',
        duration: 60,
      },
      {
        time: '12:00',
        department: 'Skin 1',
        patient: 'Eshanya',
        doctor: 'Ms. Rukhsar',
        procedure: 'Skin Tightening Facial',
        duration: 60,
      },
      {
        time: '09:00',
        department: 'Skin 2',
        patient: 'Simran',
        doctor: 'Dr. Pooja',
        procedure: 'Face Hifu',
        duration: 15,
      },
    ];
  }

  getAppointmentAt(time: string, dept: string): Appointment | undefined {
    return this.appointments.find(
      (app) => app.time === time && app.department === dept
    );
  }

  isCellRendered(time: string, dept: string): boolean {
    const appointment = this.getAppointmentAt(time, dept);
    if (appointment) return true;

    const currentIndex = this.timeSlots.indexOf(time);
    if (currentIndex === -1) return true;

    for (let i = 0; i < this.appointments.length; i++) {
      const app = this.appointments[i];
      if (app.department !== dept) continue;

      const appIndex = this.timeSlots.indexOf(app.time);
      const span = app.duration / 15;

      if (appIndex < currentIndex && currentIndex < appIndex + span) {
        return false;
      }
    }

    return true;
  }
  //   ngOnInit(): void {
  //     this.timeSlots = this.generateTimeSlots('10:00', '17:30', 30);
  //   this.appointments = this.getAppointments();
  //   }

  //    generateTimeSlots(start: string, end: string, interval: number): string[] {
  //   const times: string[] = [];
  //   const [startH, startM] = start.split(':').map(Number);
  //   const [endH, endM] = end.split(':').map(Number);

  //   let current = new Date();
  //   current.setHours(startH, startM, 0, 0);
  //   const endTime = new Date();
  //   endTime.setHours(endH, endM, 0, 0);

  //   while (current <= endTime) {
  //     const hh = current.getHours().toString().padStart(2, '0');
  //     const mm = current.getMinutes().toString().padStart(2, '0');
  //     times.push(`${hh}:${mm}`);
  //     current.setMinutes(current.getMinutes() + interval);
  //   }
  //   return times;
  // }

  //    getAppointments(): Appointment[] {
  //     return [
  //       {
  //         time: '11:00',
  //         department: 'Laser',
  //         patient: 'Vinaya',
  //         doctor: 'Dr. Pooja',
  //         procedure: 'Consultation',
  //         duration: 60
  //       },
  //       {
  //         time: '12:00',
  //         department: 'Skin 1',
  //         patient: 'Eshanya',
  //         doctor: 'Ms. Rukhsar',
  //         procedure: 'Skin Tightening Facial',
  //         duration: 30
  //       },
  //       {
  //         time: '16:00',
  //         department: 'Skin2',
  //         patient: 'Simran',
  //         doctor: 'Dr. Pooja',
  //         procedure: 'Face Hifu',
  //         duration: 30
  //       }
  //     ];
  //   }

  //   getAppointmentAt(time: string, dept: string): Appointment | undefined {
  //   return this.appointments.find(app => app.time === time && app.department === dept);
  // }

  //   isCellRendered(slot: string, dept: string): boolean {
  //   const timeIndex = this.timeSlots.indexOf(slot);

  //   for (let i = 0; i < timeIndex; i++) {
  //     const prevSlot = this.timeSlots[i];
  //     const app = this.getAppointmentAt(prevSlot, dept);
  //     if (app) {
  //       const span = app.duration / 15;
  //       if (i + span > timeIndex) return false;
  //     }
  //   }
  //   return true;
  // }

  goToPreviousDay(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.selectedDate = new Date(this.selectedDate);
  }

  goToNextDay(): void {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.selectedDate = new Date(this.selectedDate);
  }
  openPatientDetails() {
    console.log('In Patient Details');
    const modal = new bootstrap.Modal(this.detailsModal.nativeElement, {
      backdrop: 'static',
      keyboard: false,
    });
    modal.show();
  }
}
