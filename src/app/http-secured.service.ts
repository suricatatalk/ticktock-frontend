import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptionsArgs, ConnectionBackend, RequestOptions, Response, Headers } from '@angular/http';
import { AuthStorageService } from './auth-storage.service';
import { Observable } from 'rxjs';




@Injectable()
export class HttpSecuredService {

  AUTH_HEADER: string = 'x-auth';

  constructor(private _http: Http,
    private _authStorage: AuthStorageService,
    private _router: Router) {}

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    let opt = this.addAuthHeader(options);
    return this.tokenExchange(this._http.get(url, opt));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let opt = this.addAuthHeader(options);
    return this.tokenExchange(this._http.post(url, body, opt));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    let opt = this.addAuthHeader(options);
    return this.tokenExchange(this._http.put(url, body, opt));
  }

  addAuthHeader(options?: RequestOptionsArgs): RequestOptionsArgs {
    let authToken = this._authStorage.getToken();
    let headers = new Headers({ 'Accept': 'application/json' });
    headers.append(this.AUTH_HEADER, authToken);
    let opt = new RequestOptions({ headers: headers });
    return opt.merge(options);
  }

  tokenExchange(observable: Observable<Response>): Observable<Response> {
    let shared = observable.share();
    shared.catch((err, source) => {
      if (err.status === 401 && !err.url.endsWith('/login')) {
        console.log('Redirecting to login');
        this._router.navigate(['/login']);
        return Observable.empty();
      } else {
        console.log('Error');
        return Observable.throw(err);
      }
    }).subscribe((res => {
      if (res.headers.has(this.AUTH_HEADER)) {
        this._authStorage.saveToken(res.headers.get(this.AUTH_HEADER));
      }
    }));
    return shared;
  }

}
