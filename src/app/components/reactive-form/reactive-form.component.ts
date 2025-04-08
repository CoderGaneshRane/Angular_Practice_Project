import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent {

  //First Way:
  studentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{6}$')]),
    isAgree: new FormControl(false, [Validators.requiredTrue])
  })

  //Second Way:
  // constructor(private fb:FormBuilder){
  //   this.studentForm = this.fb.group({
  //     firstName: new FormControl('',[Validators.required]),
  //     lastName: new FormControl('',[Validators.required]),
  //     username: new FormControl('',[Validators.required]),
  //     city: new FormControl('',[Validators.required]),
  //     state: new FormControl('',[Validators.required]),
  //     zipCode: new FormControl('',[Validators.required]),
  //     isAgree: new FormControl('',[Validators.required])
  //   });
  // }
 
  clearForm(){
    this.studentForm.reset();
  }
  onSubmit(){
    console.log("Submitted Successfully!!", this.studentForm.value);
  }
}
