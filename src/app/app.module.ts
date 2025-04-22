import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormComponent } from './components/template-form/template-form.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormComponent } from './components/reactive-form/reactive-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GetApiComponent } from './components/get-api/get-api.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostApiComponent } from './components/post-api/post-api.component';
import { TagInputModule } from 'ngx-chips';
import { PrintComponent } from './components/print/print.component';
import { TodoComponent } from './to-do-list/todo/todo.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LoginComponent } from './components/abha/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,
    ReactiveFormComponent,
    GetApiComponent,
    PostApiComponent,
    PrintComponent,
    TodoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton:true,
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    TagInputModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
