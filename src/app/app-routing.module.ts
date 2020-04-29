import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ListcontactsComponent } from './components/listcontacts/listcontacts.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';
import { ResetpasswordComponent } from './components/resetpassword/resetpassword.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewprofileComponent } from './components/viewprofile/viewprofile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'addContact',
    component: AddcontactComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ADMIN"] }
  },
  {
    path: 'listContact',
    component: ListcontactsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ADMIN"] }
  },
  {
    path: 'resetPassword',
    component: ResetpasswordComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_USER"] }
  },
  {
    path: 'forgotPassword',
    component: ForgotpasswordComponent
  },
  {
    path: 'viewProfile',
    component: ViewprofileComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ROLE_ADMIN", "ROLE_USER"] }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PagenotfoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, /* {
    enableTracing: true
  } */)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
