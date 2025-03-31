import { Component } from '@angular/core';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent {
studentObj:any={
  firstName:'',
  lastName:'',
  userName:'',
  city:'',
  state:'',
  zip:'',
  isAgreed:false
}
onSubmit(){
  console.table(this.studentObj);
}
clearForm(){
  this.studentObj={
    firstName:'',
    lastName:'',
    userName:'',
    city:'',
    state:'',
    zip:'',
    isAgreed:false
  }
}
}
