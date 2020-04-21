import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appChangefontfamily]'
})
export class ChangefontfamilyDirective {


  constructor(private e1: ElementRef) {
    e1.nativeElement.style.fontFamily = 'Verdana';
    e1.nativeElement.style.fontSize = '16px';
    e1.nativeElement.style.textAlign = 'center';
  }

  //Usage of Hostbinding and Hostlistener decorators
  /* @HostListener('click') onClick() {
    console.log("click event")
    this.changeBgColor('red')
    this.border = '2px solid grey';
    this.borderColor = 'green';
  }

  @HostListener('mouseleave') onMouseLeave() {
    console.log("mouseleave event")
    this.changeBgColor('green')
  }

  @HostBinding('style.border') border :string;
  @HostBinding('style.border-color') borderColor :string;

  changeBgColor(color: string) {
    this.e1.nativeElement.style.backgroundColor = color;
  } */
}
