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
visible:boolean=false;
id:any;
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
    if(this.tagarr){
      this.visible = true;
    }
    this.tagarr.push({
      name: tag?.name
    })
    this.result = this.result.filter(item => item.name!==tag.name);
  }
  removeTag(tag: any) {
    const index = this.tagarr.indexOf(tag);
    if (index !== -1) {
      this.tagarr.splice(index, 1);  
    }
    this.result = this.userList.filter(item => !this.tagarr.some(tag => tag.name === item.name));

    if(this.result.length === this.userList.length){
      this.visible=false;
    }
  }
  submitTag(){
    this.toastr.success('','Tag Submitted Successfully!!');
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
editRecord(data:any){
  this.userData.get('name')?.setValue(data.name);
  this.userData.get('phone')?.setValue(data.phone);
  this.userData.get('username')?.setValue(data.username);
  this.userData.get('city')?.setValue(data.address.city);
  this.userData.get('street')?.setValue(data.address.street);
  this.userData.get('zipcode')?.setValue(data.address.zipcode);
  this.id = data.id;
}
submitEditRecord(){
this.userList[this.id-1].name = this.userData.value.name;
this.userList[this.id-1].username = this.userData.value.username;
this.userList[this.id-1].phone = this.userData.value.phone;
this.userList[this.id-1].address.city = this.userData.value.city;
this.userList[this.id-1].address.street = this.userData.value.street;
this.userList[this.id-1].address.zipcode = this.userData.value.zipcode;
}
deleteRecord(deleteId:any){
 this.userList =  this.userList.filter(user => user.id !== deleteId);
}
}
