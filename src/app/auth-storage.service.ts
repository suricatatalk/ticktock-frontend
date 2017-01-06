import { Injectable } from '@angular/core';

@Injectable()
export class AuthStorageService {

  private XAUTH_ITEM: string = 'xauth';

  constructor() { }

  saveToken(token: string) {
    localStorage.setItem(this.XAUTH_ITEM, token);
  }

  getToken() {
    return localStorage.getItem(this.XAUTH_ITEM);
  }

  reset() {
    localStorage.removeItem(this.XAUTH_ITEM);
  }


}
