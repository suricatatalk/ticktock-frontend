import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from '../auth-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private _authStorage: AuthStorageService, private _router: Router) {
  }

  ngOnInit() {
    this._route.queryParams.subscribe(
      (param: any) => {
        console.log('Params' + JSON.stringify(param));
        let xauth = param['token'];
        let firstLogin = param['firstlogin'];
        if (xauth != null) {
          console.log('Saving token' + xauth);
          this._authStorage.saveToken(xauth);
        }
        if (this._authStorage.getToken() != null && firstLogin == null) {
          console.log('Redirecting to home');
          this._router.navigate(['/home']);
        } else if (this._authStorage.getToken() != null) {
          console.log('Redirecting to settings');
          this._router.navigate(['/settings']);
        }
      });
  }

}
