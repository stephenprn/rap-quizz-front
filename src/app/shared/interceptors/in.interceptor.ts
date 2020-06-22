import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '../services/ui.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class InInterceptor implements HttpInterceptor {
  constructor(
    private uiService: UiService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
              this.router.navigate(['/']);
            } else if (err.status === 401) {
              this.authenticationService.removeToken();
              this.uiService.displayToast(
                'Your session has expired, please login again'
              );
            }
          }
        }
      )
    );
  }
}
