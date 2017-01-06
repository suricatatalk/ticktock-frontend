import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpSecuredService } from './http-secured.service';

export class Task {
  id: string;
  name: string;
  duration: number;
  status: string;
  start: number;
  end: number;
}

export class Event {
  taskName: string;
  taskId: string;
  eventEpoch: number;
  eventType: string;
}


@Injectable()
export class BackendService {

  id: number = new Date().getMilliseconds();
  base: string = 'https://3c6d5eaf.ngrok.io/';

  private _list: Task[] = [];
  private _observableList: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  constructor(private http: HttpSecuredService) { 
    this.refresh();
  }

  get observableList(): Observable<Task[]> { return this._observableList.asObservable() }


  refresh() {
    console.log("BackendService"+this.id+": refresh called");
    this.http.get(this.base + 'tasks').map(res => res.json()).subscribe(res => {
      this._list = <Task[]>res;
      this._observableList.next(this._list);
    });
  }

  getTasks() {
    this._list.push(new Task());
    // return this.http.get(this.base + 'tasks')
    //   .map(res => res.json());
  }

  startTask(name: string) {
    let task = new Event();
    task.taskName = name;
    task.eventEpoch = new Date().getTime();
    task.eventType = 'start';
    this.http.post(this.base + 'events', task);
  }

  pauseTask(inputTask: Task) {
    this.doEvent(inputTask, 'pause')
  }

  resumeTask(inputTask: Task) {
    this.doEvent(inputTask, 'start')
  }

  finishTask(inputTask: Task) {
    this.doEvent(inputTask, 'finish')
  }

  private doEvent(inputTask: Task, action: string) {
    let event = new Event();
    event.eventEpoch = new Date().getTime();
    event.eventType = action;
    event.taskId = inputTask.id;
    this.http.put(this.base + 'events', event);
  }

}
