import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";


//const baseUrl = 'http://localhost:4205/api';
const baseUrl = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.post(baseUrl + '/getAllContacts', '');
  }

  get(id) {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data) {
    return this.http.post(baseUrl + '/addContact', data);
  }

  update(id, data) {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(data) {
    return this.http.post(baseUrl + '/deleteContact', data);
  }

  findByName(data) {
    return this.http.post(`${baseUrl}/findContact`, data);
  }
}
