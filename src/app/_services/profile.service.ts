import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

const baseUrl = environment.apiEndPoint;
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  resetPassword(data) {
    return this.http.post(baseUrl + '/auth/resetPassword', data)
  }

  findUser(data) {
    return this.http.post(baseUrl + '/findUser', data)
  }

  getRoles(){
    return this.http.post(baseUrl + '/getRoles', "")
  }
  
  forgotPassword(data){
    return this.http.post(baseUrl + '/auth/forgotPassword', data)
  }

  getAllUsers(){
    return this.http.post(baseUrl + '/getAllUsers', '')
  }
  
  changeUserStatus(data){
    return this.http.post(baseUrl + '/auth/changeUserStatus', data)
  }
}
