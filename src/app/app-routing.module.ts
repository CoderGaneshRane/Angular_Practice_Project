import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { GetApiComponent } from './components/get-api/get-api.component';
import { PostApiComponent } from './components/post-api/post-api.component';
import { PrintComponent } from './components/print/print.component';

const routes: Routes = [
  {
   // path: '', component:TemplateFormComponent
   path: '', component:ReactiveFormComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
