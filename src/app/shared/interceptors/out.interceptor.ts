import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class OutInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("OUT INT");
    console.log(this.authenticationService.userConnected$.value);
    console.log(this.authenticationService.token);

    if (this.authenticationService.userConnected$.value) {
      if (this.authenticationService.token != null) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            `JWT ${this.authenticationService.token}`
          ),
        });
      }
    }

    // pass on the modified request object
    return next.handle(request);
  }
}
