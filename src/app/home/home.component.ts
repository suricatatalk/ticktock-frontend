import { Component, OnInit, ViewChild, QueryList, forwardRef } from '@angular/core';
import { TaskInputComponent } from '../task-input/task-input.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { AuthStorageService } from '../auth-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {


  constructor(private _route: ActivatedRoute,
    private _authStorage: AuthStorageService) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(
      (param: any) => {
        let xauth = param['token'];
        if (xauth != null) {
          this._authStorage.saveToken(xauth);
        }
      });
  }

}
