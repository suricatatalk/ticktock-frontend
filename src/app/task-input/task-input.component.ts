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
  isRunning:boolean;
  duration: number;

  constructor() { 
    this.buttonTitle = "Start";
    this.task = new Task();
  }


  setTask(task:Task){
    this.task = task;
    this.isRunning = (task.status === "running")
    setInterval(() => {
        let date =  new Date();
        this.duration = (date.getTime()- this.task.start)
     }, 1000);
  }


  ngOnInit() {
  }

}
