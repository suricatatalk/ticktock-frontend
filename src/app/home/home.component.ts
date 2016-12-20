import { Component, OnInit ,ViewChild,QueryList,forwardRef} from '@angular/core';
import {TaskInputComponent} from '../task-input/task-input.component';
import {TaskListComponent} from '../task-list/task-list.component';
import {BackendService,Task} from '../backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BackendService]
})
export class HomeComponent implements OnInit {
@ViewChild(forwardRef(() => TaskInputComponent)) input: TaskInputComponent;;
@ViewChild(forwardRef(() => TaskListComponent)) list: TaskListComponent;

  constructor(private backendService: BackendService) {}
  ngAfterContentInit() {

  }

  ngOnInit() {
        this.backendService.getTasks().subscribe(res =>{
     let tempTasks = <Task[]>res
     this.input.setTask(tempTasks[0])

     this.list.tasks = tempTasks.slice(1)
    })
  }

}
