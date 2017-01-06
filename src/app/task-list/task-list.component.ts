import { Component, OnInit } from '@angular/core';
import { BackendService, Task } from '../backend.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [BackendService]
})
export class TaskListComponent implements OnInit {

  tasks: Task[];

  constructor(private _backendService: BackendService) {
    _backendService.observableList.subscribe(tsk =>{
      this.tasks = tsk;
    });
  }

  ngOnInit() {
  }
}
