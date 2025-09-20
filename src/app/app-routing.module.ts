import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { GetApiComponent } from './components/get-api/get-api.component';
import { PostApiComponent } from './components/post-api/post-api.component';
import { PrintComponent } from './components/print/print.component';
import { TodoComponent } from './to-do-list/todo/todo.component';
import { LoginComponent } from './components/abha/login/login.component';
import { ImageMarkerComponent } from './components/image-marker/image-marker.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { HomeLoanComponent } from './components/home-loan/home-loan.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
   // path: '', component:TemplateFormComponent
   path: 'reactive-form', component:ReactiveFormComponent
  },
  {
    path:'template-form', component:TemplateFormComponent
  },
  {
    path:'get-api', component:GetApiComponent
  },
  {
    path:'post-api', component:PostApiComponent
  },
  {
    path:'print', component:PrintComponent
  },
  {
    path:'todo-list', component:TodoComponent
  },
  {
    path:'image-marker', component:ImageMarkerComponent
  },
  {
    path:'schedule', component:ScheduleComponent
  },
  {
    path:'patient-form', component:PatientFormComponent
  },
  {
    path:'home-loan', component:HomeLoanComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
