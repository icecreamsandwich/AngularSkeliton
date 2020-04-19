import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-skeleton';
  userDetails = {
    userName : '',
    userToken : ''
  }
  isAuthenticated = false;
  constructor (private authService : AuthService, private router : Router){
    this.getUserDetails()
  }

  getUserDetails(){
    this.userDetails.userName = this.authService.getUserName()
    this.userDetails.userToken = this.authService.getToken()
    if(this.userDetails.userToken && this.userDetails.userName){
      this.isAuthenticated = true;
    }
  }
  logout(e){
    e.preventDefault()
    if(this.authService.signOut()){
      this.router.navigate(['/login'])
    }
  }
}
