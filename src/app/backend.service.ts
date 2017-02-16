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
  events: Event[];
}

export class Event{
  taskName: string;
  taskId: string;
  eventEpoch: number;
  eventType: string;
}


@Injectable()
export class BackendService {

  base: string = 'https://cc226611.ngrok.io';

  private _list: Task[] = [];
  private _observableList: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  constructor(private http: HttpSecuredService) {
    console.log("BackendService has been created.");
    this.refresh();
  }

  get observableList(): Observable<Task[]> { return this._observableList.asObservable().share() }


  refresh() {
    console.log("BackendService: refresh called");
    let obs = this.http.get(this.base + '/tasks').map(res => res.json()).subscribe(res => {
      this._list = <Task[]>res;
      this._observableList.next(this._list);
      console.log("BackendService: pushed list: " + JSON.stringify(this._list));
      obs.unsubscribe();
    });
  }

  startTask(name: string) {
    let task = new Event();
    task.taskName = name;
    task.eventEpoch = new Date().getTime();
    task.eventType = 'start';
    let obs = this.http.post(this.base + '/events', task).subscribe(res => {
      this.refresh();
      obs.unsubscribe();
    });
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
    let obs = this.http.put(this.base + '/events', event).subscribe(res => {
      this.refresh();
      obs.unsubscribe();
    });
  }

}
