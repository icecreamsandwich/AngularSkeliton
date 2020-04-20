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
  isAuthenticatedObs = new Observable<boolean>((observer: Observer<boolean>) => {
    setInterval(() => observer.next(this.authService.isAuthenticated())
      , 1000);
  });

  
  public isAuthenticated$: BehaviorSubject<boolean>
  userDetails = {
    userName: '',
    userToken: ''
  }
  constructor(public authService: AuthService, private router: Router) {
    //this.isAuthenticated$ = new BehaviorSubject(false)
  }

  ngOnInit(): void {
    this.isAuthenticated$ = new BehaviorSubject(false)
    this.getUserDetails()
  }

  ngOnDestroy(): void {

  }

  getUserDetails() {
    this.userDetails.userName = this.authService.getUserName()
    this.userDetails.userToken = this.authService.getToken()
    if (this.userDetails.userToken && this.userDetails.userName) {
      this.isAuthenticated$.next(true);
    }
  }
  logout(e) {
    e.preventDefault()
    this.isAuthenticated$.next(false);
    if (this.authService.signOut()) {
      this.router.navigate(['/login'])
    }
  }
}
