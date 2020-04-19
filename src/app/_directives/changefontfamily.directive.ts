import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChangefontfamily]'
})
export class ChangefontfamilyDirective {

  constructor(private e1: ElementRef) { 
    e1.nativeElement.style.fontFamily = 'Verdana';
    e1.nativeElement.style.fontSize = '16px';
    e1.nativeElement.style.textAlign = 'center';
  }

}
