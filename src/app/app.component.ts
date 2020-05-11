import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-skeleton';
  isAuthenticated: any
  isAdmin: any
  userDetails = {
    userName: '',
    userToken: ''
  };
  userName: any
  userType: string

  constructor(public authService: AuthService, private router: Router) {
    this.userName = new Observable<string>((observer: Observer<string>) => {
      setInterval(() => {
        observer.next(this.authService.getUserName());
      }, 1);

      this.authService.isAuthenticatedV.subscribe(res =>{
        this.isAuthenticated = res;
      })
    })


  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin()
    this.authService.userType.subscribe(res => {
      this.userType = res;
    });
     this.authService.isAuthenticatedV.subscribe(res =>{
      this.isAuthenticated = res;
    })
    
  }

  ngOnDestroy(): void {

  }

  getUserDetails() {
    this.userDetails.userName = this.authService.getUserName();
    this.userDetails.userToken = this.authService.getToken();
  }
  logout(e) {
    e.preventDefault();
    this.authService.setAdmin(false)
    this.authService.isAuthenticatedV.next(false)
    if (this.authService.signOut()) {
      this.router.navigate(['/login']);
    }
  }
}
