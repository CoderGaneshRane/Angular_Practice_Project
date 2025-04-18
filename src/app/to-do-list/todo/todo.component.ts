import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  task: any;
  taskArray: any[] = [];
  totalTaskArray:any[] = [];
  completedTaskArray:any[]=[];
  deletedTaskArray:any[]=[];
  priorityArray = [
    {
      id: 1, name: 'High-priority'
    },
    {
      id: 2, name: 'Medium-priority'
    },
    {
      id: 3, name: 'Low-priority'
    }
  ]
  constructor(private service:ApiService,
    private toastr:ToastrService
  ){
    this.allTask();
  }
  taskData: FormGroup = new FormGroup({
    task: new FormControl('',[Validators.required]),
    priority: new FormControl(null,[Validators.required]),
    date: new FormControl('',[Validators.required])
  });
  addTask() {
    var data = {
      "task_name": this.taskData.value.task,
      "task_priority": this.taskData.value.priority,
      "task_date": this.taskData.value.date
    }
    console.log(data);
    this.service.addTodoTask(data).subscribe({
      next: (res: any) => {
        this.toastr.success('', 'Task Added Successfully!')
        this.taskData.reset();
        this.allTask();
      }
    })
  }
  allTask(){
    this.service.getAllTask().subscribe({
      next: (res:any) => {
        this.taskArray = res;
        console.log(this.taskArray)
      }
    })
  }
}
