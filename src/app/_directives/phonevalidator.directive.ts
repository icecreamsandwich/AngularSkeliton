import { Directive } from '@angular/core';
import { Validator, AbstractControl } from '@angular/forms';
import { ValidatorService } from '../_services/validator.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appPhonevalidator]'
})
export class PhonevalidatorDirective implements Validator {


  constructor(private validateService: ValidatorService) {

  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    console.log(control.value)
    return this.validateService.validatePhoneNumber(control.value)
  }

}
