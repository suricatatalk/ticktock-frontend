import { Component, OnInit } from '@angular/core';
import { BackendService, User } from '../backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  data: User = new User();

  constructor(private _backService: BackendService,private _router: Router) {
  }

  ngOnInit() {
    let sub = this._backService.user.subscribe(user => {
      this.data = user;
      sub.unsubscribe();
    });
    this._backService.getUser();
  }

  submitForm() {
    let sub = this._backService.user.subscribe(user => {
      sub.unsubscribe();
      this.data = user;
      this._router.navigate(['/home']);
    });
    console.log('Saving '+JSON.stringify(this.data));
    this._backService.saveUser(this.data);
  }


}
