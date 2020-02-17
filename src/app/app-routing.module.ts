import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './views/auth/login/login.component';
import {LogoutComponent} from './views/auth/logout/logout.component';
import {ProfileComponent} from './views/account/profile/profile.component';
import {HomeComponent} from './views/home/home.component';
import {AuthGuard} from './core/auth/services/auth.guard';
import {UserRouteAccessService} from './core/auth/services/user-route-access-service';



const route: Routes = [
  { path: 'login',  component: LoginComponent },
  { path: 'logout', data: {  authorities: ['ROLE_USER'] }, component: LogoutComponent , canActivate: [UserRouteAccessService]},
  { path: 'account/profile',   data: {  authorities: ['ROLE_ADMIN'] }, component: ProfileComponent , canActivate: [UserRouteAccessService]},
  { path: 'account/register', component: ProfileComponent},
  { path: '', component: HomeComponent,  pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(route
      // , { enableTracing: true }
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
