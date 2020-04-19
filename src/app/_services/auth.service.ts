import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:4205/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signIn(data) {
    return this.http.post(baseUrl + '/auth/signin', data);
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
    if (token) return true;
  }

  public signOut(): boolean {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    console.log("User logout successfully")
    return true;
  }

}
