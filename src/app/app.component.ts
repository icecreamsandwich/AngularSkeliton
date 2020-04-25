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
  isAuthenticatedObs: any
  isAdmin: any
  userDetails = {
    userName: '',
    userToken: ''
  };
  userName : any
  //public isAuthenticated$: BehaviorSubject<boolean>;
  
  constructor(public authService: AuthService, private router: Router) {
    this.isAuthenticatedObs = new Observable<object>((observer: Observer<object>) => {
      setInterval(() => {
        const result = JSON.parse(JSON.stringify(this.authService.isAuthenticated()))
        observer.next(result.authenticated)
      }, 1);// 1 millisecond
    });
    
     this.isAdmin = new Observable<object>((observer: Observer<object>) => {
      setInterval(() => {
        const result = JSON.parse(JSON.stringify(this.authService.isAuthenticated()))
        observer.next(result.isAdmin)
      }, 1);// 1 millisecond
    });
    this.userName = new Observable<string>((observer: Observer<string>) =>{
      setInterval(() => {
        observer.next(this.authService.getUserName());
      }, 1);
    })
    
    
  }

  ngOnInit(): void {
    //this.isAuthenticated$ = new BehaviorSubject(false);
    this.isAdmin = this.authService.isAdmin()
  }

  ngOnDestroy(): void {

  }

  getUserDetails() {
    this.userDetails.userName = this.authService.getUserName();
    this.userDetails.userToken = this.authService.getToken();
  /*   if (this.userDetails.userToken && this.userDetails.userName) {
      this.isAuthenticated$.next(true);
    } */
  }
  logout(e) {
    e.preventDefault();
    this.authService.setAdmin(false)
    //this.isAuthenticated$.next(false);
    if (this.authService.signOut()) {
      this.router.navigate(['/login']);
    }
  }
}
