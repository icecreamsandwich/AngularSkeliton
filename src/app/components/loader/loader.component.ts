import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from 'src/app/_services/loader.service';
import { Subscription } from 'rxjs';
import { LoaderState } from 'src/app/_interfaces/loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
