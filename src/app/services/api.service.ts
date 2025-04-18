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
    return this.http.post("Mock-API",data);
  }
  getAllStudents():Observable<any>{
    return this.http.get("http://localhost:2525/student/get-all-students");
  }
  addTodoTask(task:any):Observable<any>{
    return this.http.post("https://67f638fe42d6c71cca61000b.mockapi.io/post/template",task);
  }
  getAllTask():Observable<any>{
    return this.http.get("https://67f638fe42d6c71cca61000b.mockapi.io/template");
  }
}
