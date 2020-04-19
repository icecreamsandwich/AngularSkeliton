import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from "../_services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //Get Any headers passed before making http requests
    console.log(request.headers)
    if (request.headers.has("SkipHeader")) {
      return next.handle(request)
    } else {
      const headers = new HttpHeaders({
        'Authorization': this.authService.getToken(),
        'WEB-API-key': 'secret-key',
        'Content-Type': 'application/json'
      });
      const cloneReq = request.clone({ headers });
      return next.handle(cloneReq);
    }
  }
}
