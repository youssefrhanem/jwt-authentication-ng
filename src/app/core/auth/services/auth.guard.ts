import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authenticationService: AuthenticationService,
              public router: Router,
              private localStorage: LocalStorageService,
              private sessionStorage: SessionStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if ( this.authenticationService.isLoggedIn() !== true) {
      window.alert('Access not allowed!');
      this.router.navigate(['login']);
    }
    // window.localStorage.setItem('authenticationToken', this.authenticationService.getToken());
    return true;
  }
}
