import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

const baseUrl = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //define a behavioural subject that subscribe to a service
  userDetailsSubject = new BehaviorSubject<string>("")
  contactDetailsSubject = new BehaviorSubject<string>("")
  currentUserDetailsOb: any

  constructor(private http: HttpClient) { }

  signIn(data) {
    // skip headers adding interceptor for the sigin request
    const headers = new HttpHeaders().set('SkipHeader', 'yes');
    return this.http.post(baseUrl + '/auth/signin', data, { headers });
  }


  signUp(data){
    return this.http.post(baseUrl + '/auth/signup', data);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getUserName(): string {
    return localStorage.getItem('userName');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    if (token) { return true; }
    else { return false; }
  }

  public signOut(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    console.log('User logout successfully');
    return true;
  }

  public currentUserDetails(): object {
    this.currentUserDetailsOb = {
      username: localStorage.getItem('userName'),
      token: localStorage.getItem('token'),
      roles: localStorage.getItem('roles')
    }
    return this.currentUserDetailsOb
  }
  /**
   * Create a function that return some values that changes overtime
   * Caution !! Remove the functions after testing
   * Behaviour subject with SetTimeInterval
   */

  public getUserDetails(): Observable<string> {
    setInterval(() => {
      const data = {
        username: "admin",
        password: "admin"
      }
      this.http.post(baseUrl + '/auth/signin', data).subscribe(
        response => {
          //console.log(response);
          var responseJson = JSON.parse(JSON.stringify(response))
          this.userDetailsSubject.next(responseJson.accessToken)
        },
        error => {
          console.log(error);
          console.log(error.statusText)
        })
    }, 5000);

    return this.userDetailsSubject.asObservable();
  }

  /**
   * Get contact details as a service to show the data asynchronously
   * Normal Behaviour subject
   */
  public getContactDetails(): Observable<string> {
    this.http.post(baseUrl + '/getAllContacts', '').subscribe(
      response => {
        var responseJson = JSON.parse(JSON.stringify(response))
        this.contactDetailsSubject.next(responseJson)
      }, error => {
        console.log(error);
        console.log(error.statusText)
      }
    )

    return this.contactDetailsSubject.asObservable();
  }


}
