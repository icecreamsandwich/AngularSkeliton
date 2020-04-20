import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoaderService } from '../_services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside loader interceptor")
    this.showLoader()
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.onEnd()
        }
      },
      error => {
        console.log(error)
        this.onEnd()
      }
    ));
  }

  onEnd(): void {
    this.hideLoader()
  }
  showLoader(): void {
    this.loaderService.show()
  }

  hideLoader(): void {
    this.loaderService.hide()
  }
}
