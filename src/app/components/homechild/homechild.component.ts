import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-homechild',
  templateUrl: './homechild.component.html',
  styleUrls: ['./homechild.component.css']
})
export class HomechildComponent implements OnInit {

  @Input() GreetMessage: string;
  @Input() message: string;
  constructor() { }

  ngOnInit(): void {
  }

}
