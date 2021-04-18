import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class OutInterceptor implements HttpInterceptor {
  private readonly URL_REFRESH_TOKEN = 'auth/refresh';

  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.authenticationService.userConnected$.value) {
      if (this.authenticationService.token != null) {
        if (request.url.endsWith(this.URL_REFRESH_TOKEN)) {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${this.authenticationService.refreshToken}`
            )
          });
        } else {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${this.authenticationService.token}`
            )
          });
        }
      }
    }

    // pass on the modified request object
    return next.handle(request);
  }
}
