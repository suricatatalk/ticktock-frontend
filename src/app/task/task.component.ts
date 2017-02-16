import { Component, OnInit,Input } from '@angular/core';
import {Task} from '../backend.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input()task:Task;
}
