import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {

  private XAUTH_ITEM: string = 'xauth';
  private _user: string;

  constructor() {
    let token = localStorage.getItem(this.XAUTH_ITEM);
    if (token != null) {
      let decoded = atob(token.split('.')[1]);
      let json = JSON.parse(decoded);
      this._user = json.ID;
    }
   }

  get user(): string { return this._user; }

  saveToken(token: string) {
    localStorage.setItem(this.XAUTH_ITEM, token);
    let decoded = atob(token.split('.')[1]);
    let json = JSON.parse(decoded);
    this._user = json.ID;
  }

  getToken() {
    let token = localStorage.getItem(this.XAUTH_ITEM);
    return token;
  }

  reset() {
    localStorage.removeItem(this.XAUTH_ITEM);
  }


}
