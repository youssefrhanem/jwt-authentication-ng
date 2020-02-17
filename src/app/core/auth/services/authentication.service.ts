import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Login} from '../_models/login.model';
import {map} from 'rxjs/operators';

import { SERVER_API_URL } from '../../../app.constants';

type JwtToken = {
  id_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  authToken;

  constructor(private http: HttpClient,
              public router: Router,
              private $localStorage: LocalStorageService,
              private $sessionStorage: SessionStorageService) { }

  getToken(): string {
    return this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken') || '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(SERVER_API_URL + '/authenticate', credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe)));
  }


  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  isLoggedIn(): any {
    this.authToken = this.getToken();
    return (this.authToken !== null) ? true : false;
  }

  /*isLoggedIn(): boolean {
    const token = this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken');
    if (localStorage.getItem('authenticationToken') !== null) {
      this.authToken = localStorage.getItem('authenticationToken');
      console.log('local authenticationToken :' +  this.authToken);
      return true ;
    } else  if (sessionStorage.getItem('authenticationToken') !== null) {
      this.authToken = sessionStorage.getItem('authenticationToken');
      console.log('local authenticationToken :' +  this.authToken);
      return true ;
    } else {
      return false ;
    }
    /*console.log('isLoggedIn : ' + this.authToken !== null ? true : false);
    return (this.authToken !== null) ? true : false;
  }
*/



  private authenticateSuccess(response: JwtToken, rememberMe: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      console.log('local authenticationToken :' + jwt);
      this.$localStorage.store('authenticationToken', jwt);
    } else {
      console.log('session authenticationToken :' + jwt);
      this.$sessionStorage.store('authenticationToken', jwt);
    }
  }
}
