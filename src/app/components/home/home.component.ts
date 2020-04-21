import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = 'Hi child';
  GreetMessage = 'css and php[server] too';

  constructor() { }

  ngOnInit(): void {
  }


}
