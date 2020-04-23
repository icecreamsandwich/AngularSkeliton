import { Directive, forwardRef, Output, EventEmitter } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { ValidatorService } from '../_services/validator.service';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appPhonevalidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => PhonevalidatorDirective), multi: true }] //useExisting: forwardRef(() => PhonevalidatorDirective)
})
export class PhonevalidatorDirective implements Validator {


  constructor(private validateService: ValidatorService) {

  }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
    console.log(control.value)
    console.log(this.validateService.validatePhoneNumber(control.value))
    return this.validateService.validatePhoneNumber(control.value)
  }

}
