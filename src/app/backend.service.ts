import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"; 

export class Task {
  name: string;
  duration: number;
}


@Injectable()
export class BackendService {

 base: string = "https://private-30307-ticktock.apiary-mock.com/";

  constructor(private http:Http) {}

   getTasks(){
    return this.http.get(this.base+"tasks")
    .map(res => res.json())
  }

}
