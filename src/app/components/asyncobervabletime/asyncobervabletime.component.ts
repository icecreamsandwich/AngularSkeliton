import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
@Component({
  selector: 'app-asyncobervabletime',
  // templateUrl: './asyncobervabletime.component.html',
  template : `<div class="observe_time">Time: {{ time | async }}</div>`,
  styleUrls: ['./asyncobervabletime.component.css']
})
export class AsyncobervabletimeComponent implements OnInit {
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(
      new Date().toString().split(' ').slice(0, 5).join(' '))
      , 1000);
  });
  constructor() { }

  ngOnInit(): void {
  }

}
