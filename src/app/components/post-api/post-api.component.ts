import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-post-api',
  templateUrl: './post-api.component.html',
  styleUrls: ['./post-api.component.css']
})
export class PostApiComponent {
  constructor(private service:ApiService){

  }
singleUser:any[]=[];  
userList:any[]=[];
userData: FormGroup = new FormGroup({
  name: new FormControl('',[Validators.required]),
  username: new FormControl('',[Validators.required, Validators.minLength(6)]),
  phone: new FormControl('',[Validators.required, Validators.pattern('^[0-9]{10}$')]),
  city:new FormControl('',[Validators.required]),
  street:new FormControl('',[Validators.required]),
  zipcode:new FormControl('',[Validators.required, Validators.pattern('^[0-9]{6}$')])
});

submitUserData(){
  this.userList.push({
    "name": this.userData.value.name,
    "phone":this.userData.value.phone,
    "username": this.userData.value.username,
    "city": this.userData.value.city,
    "street":this.userData.value.street,
    "zipcode":this.userData.value.zipcode
  })
  this.singleUser.push({
    "name": this.userData.value.name,
    "phone":this.userData.value.phone,
    "username": this.userData.value.username,
    "city": this.userData.value.city,
    "street":this.userData.value.street,
    "zipcode":this.userData.value.zipcode
  })
  this.service.submitUser(this.singleUser).subscribe({
    next : (res:any)=>{
      console.log("Api Response After Submit = ",res);
      this.singleUser=[];
    }
  })
}
}
