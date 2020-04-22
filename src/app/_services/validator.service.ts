import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  validatePhoneNumber(phone) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const pattern = new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[()-\s\./0-9]*$');
        if (pattern.test(phone)) {
          resolve({ phoneNumberValid: true })
        } else {
          resolve({ phoneNumberValid: false })
        }
      }, 1000);

    })

  }
}
