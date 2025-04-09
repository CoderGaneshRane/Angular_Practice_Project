import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-api',
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.css']
})
export class GetApiComponent {

userId:any;
userList:any[]=[];  
resultedUser:any;
constructor(private http:HttpClient, private toastr:ToastrService){
  this.getAllUsersUsingNext();
}

//Direct using subscribe
// getAllUsers(){
//   this.http.get("https://jsonplaceholder.typicode.com/users").subscribe((response:any)=>{
//     this.userList = response
//   })
// }
//subscribe with next
userData:FormGroup = new FormGroup({
  name: new FormControl(''),
  phone:new FormControl(''),
  username:new FormControl(''),
  city: new FormControl(''),
  street: new FormControl(''),
  zipcode: new FormControl('')
})
getAllUsersUsingNext(){
  this.http.get("https://jsonplaceholder.typicode.com/users").subscribe({
    next: (res:any)=>{
      this.userList = res;
    }
  })
}
filterUserById(){

  this.resultedUser = this.userList.filter(user => user.id==this.userId);
  if(this.resultedUser[0]){
    this.toastr.success('','User retrived '+this.resultedUser[0].name)
    this.userData.get('name')?.setValue(this.resultedUser[0].name);
    this.userData.get('phone')?.setValue(this.resultedUser[0].phone);
    this.userData.get('username')?.setValue(this.resultedUser[0].username);
    this.userData.get('city')?.setValue(this.resultedUser[0].address.city);
    this.userData.get('street')?.setValue(this.resultedUser[0].address.street);
    this.userData.get('zipcode')?.setValue(this.resultedUser[0].address.zipcode);
  }
  else{
    this.userData.reset();
    this.toastr.warning('','Invalid ID')
  }
}
}
