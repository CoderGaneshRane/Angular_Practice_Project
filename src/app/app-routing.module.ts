import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { GetApiComponent } from './components/get-api/get-api.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
