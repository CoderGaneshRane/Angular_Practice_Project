import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllUsersUsingNext(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }
  submitUser(data:any):Observable<any>{
    return this.http.post("mockapi",data);
  }
  getAllStudents(){
    return this.http.get("http://localhost:2525/student/get-all-students");
  }
}
