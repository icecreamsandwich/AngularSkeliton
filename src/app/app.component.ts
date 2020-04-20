import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-skeleton';
  userDetails = {
    userName: '',
    userToken: ''
  }
  isAuthenticated = false;
  constructor(public authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.getUserDetails()
  }

  ngOnDestroy(): void {

  }

  getUserDetails() {
    this.userDetails.userName = this.authService.getUserName()
    this.userDetails.userToken = this.authService.getToken()
    if (this.userDetails.userToken && this.userDetails.userName) {
      this.isAuthenticated = true;
    }
  }
  logout(e) {
    e.preventDefault()
    if (this.authService.signOut()) {
      this.isAuthenticated = false;
      this.router.navigate(['/login'])
    }
  }
}
