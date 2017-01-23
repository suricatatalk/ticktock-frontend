import { Component, OnInit } from '@angular/core';
import { BackendService, Task, Event } from '../backend.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css'],
})
export class TaskInputComponent implements OnInit {

  buttonTitle: string;
  task: Task;
  isRunning: boolean;
  duration: number;
  lastTimer: NodeJS.Timer;

  constructor(private _backendService: BackendService) {
    this.buttonTitle = 'Start';
    console.log("TaskInputComponent: created.");
    this._backendService.observableList.subscribe(list => {
      let chosenTask: Task;
      list.forEach(item => {
        console.log("TaskInputComponent: processing list.");
        if (item.status !== 'finished') {
          console.log("TaskInputComponent: Got " + item.id);
          chosenTask = item;
        }
      });
      if (chosenTask == null) {
        chosenTask = new Task();
      }
      this.setTask(chosenTask);
    });
  }

  ngOnInit() {
    if (this.task == null) {
      this.task = new Task();
    }
  }

  setTask(task: Task) {
    console.log('Setting task: ' + JSON.stringify(task));
    this.task = task;
    this.isRunning = (task.status === 'running' || task.status === 'paused');

    if (this.lastTimer != null) {
      clearInterval(this.lastTimer);
    }

    if (this.task.status === 'running') {
      this.buttonTitle = 'Pause';

      let lastStart: number;
      this.task.events.forEach(event => {
        if (event.eventType == 0) {
          lastStart = event.eventEpoch;
        }
      });
      this.lastTimer = setInterval(() => {
        let date = new Date();
        this.duration = this.task.duration + (date.getTime() / 1000 - lastStart);
      }, 1000);
    } else {
      this.buttonTitle = 'Start';
    }
  }

  onStartPauseClick() {
    if (this.task.status == null) {
      this._backendService.startTask(this.task.name);
      return;
    }

    if (this.task.status === 'paused') {
      this._backendService.resumeTask(this.task);
      return;
    }

    if (this.task.status === 'running') {
      this._backendService.pauseTask(this.task);
      return;
    }
  }

  onFinishClick() {
    this._backendService.finishTask(this.task);
    return;
  }




}
