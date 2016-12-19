import { Component, OnInit } from '@angular/core';
import {BackendService,Task} from '../backend.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],

})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(){
          }

  ngOnInit() {
    
  }



}
