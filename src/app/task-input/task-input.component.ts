import { Component, OnInit } from '@angular/core';
import { Task, BackendService } from '../backend.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css'],
})
export class TaskInputComponent implements OnInit {

  buttonTitle: string;
  task: Task;
  isRunning: boolean;
  duration: string;

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
    console.log("Setting task: " + JSON.stringify(task));
    this.task = task;
    this.isRunning = (task.status === 'running');
    setInterval(() => {
      let date = new Date();
      this.duration = this.milisToHHMMss(date.getTime() - this.task.start);
    }, 10);
    if (this.task.status === 'running') {
      this.buttonTitle = 'Pause';
    } else {
      this.buttonTitle = 'Start';
    }
  }

  private milisToHHMMss(duration: number): string {
    let milis = (duration % (1000));
    let seconds = (duration % (1000 * 60)) / 1000;
    let minutes = (duration % (1000 * 60 * 60)) / (60 * 1000);
    let hours = (duration % (1000 * 60 * 60 * 60)) / (60 * 1000 * 60);
    return (hours.toFixed(0) + ':' + minutes.toFixed(0) + ':' + seconds.toFixed(0) + ':' + milis);
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
