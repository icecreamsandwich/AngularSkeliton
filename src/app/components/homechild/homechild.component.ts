import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-homechild',
  templateUrl: './homechild.component.html',
  styleUrls: ['./homechild.component.css']
})
export class HomechildComponent implements OnInit {
  //revieve data from parent
  @Input() GreetMessage: string;
  @Input() message: string;
  @Input() toparentData  : string = "Hello Parent"
  @Input() toChildData : string 
  //send data to parent
  @Output() childDataOutPut = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendDataToParent(){
    this.childDataOutPut.emit(this.toparentData)
  }

}
