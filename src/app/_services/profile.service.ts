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
}
