import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-get-api',
  templateUrl: './get-api.component.html',
  styleUrls: ['./get-api.component.css']
})
export class GetApiComponent {

userId:any;
userList:any[]=[];  
resultedUser:any;
result:any[]=[];
tagarr:any[]=[];
constructor(private http:HttpClient, private toastr:ToastrService, private service:ApiService){
  this.getAllUsersUsingNext();
  //this.getStudentList();
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
  this.service.getAllUsersUsingNext().subscribe({
    next : (res:any) =>{
      this.userList = res;
      // Displaying Only First Name
      // for (let i = 0; i < this.userList.length; i++) {
      //   let fullName = this.userList[i].name; 
      //   let nameParts = fullName.trim().replace(/\s+/g, ' ').split(" "); 

      //   let firstName = nameParts[0];
    
      //   this.result.push({name:firstName});
      // }
      this.result = this.userList;
    }
  });
}
  selectedTag(tag: any) {
    this.tagarr.push({
      name: tag?.name
    })
  }
  removeTag(tag: any) {
    const index = this.tagarr.indexOf(tag);
    if (index !== -1) {
      this.tagarr.splice(index, 1);  
    }
  }
  submitTag(){
    console.log(this.tagarr);
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
getStudentList(){
  this.service.getAllStudents().subscribe({
    next: (res)=> {
      console.table(res);
    }
  })
}
}
