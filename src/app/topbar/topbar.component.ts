import { Component, OnInit } from '@angular/core';
import {AuthStorageService} from './../auth-storage.service'

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private _storage:AuthStorageService) { }

  ngOnInit() {
  }

}
