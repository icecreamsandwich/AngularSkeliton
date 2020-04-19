import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddcontactComponent } from './components/addcontact/addcontact.component';
import { ListcontactsComponent } from './components/listcontacts/listcontacts.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addContact',
    component: AddcontactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listContact',
    component: ListcontactsComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
