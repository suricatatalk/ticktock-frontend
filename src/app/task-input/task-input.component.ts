import { Component, OnInit } from '@angular/core';
import {Task} from '../backend.service'

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})

export class TaskInputComponent implements OnInit {

  buttonTitle: string;
  task: Task;

  constructor() { 
    this.buttonTitle = "Start";
    this.task = new Task()
  }

  ngOnInit() {
  }

}
