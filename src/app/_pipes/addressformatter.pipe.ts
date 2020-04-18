import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressformatter'
})
export class AddressformatterPipe implements PipeTransform {

  transform(value: string): string {
    const valueAr = value.split(',');
    let ret = '';
    valueAr.forEach((element, index) => {
      element = element.replace(/"/g, '');
      ret = ret + '\n' + element;
    });
    return ret;
  }
}
