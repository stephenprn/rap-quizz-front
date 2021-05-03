import { AuthenticationApiService } from './../services/api/authentication-api.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from '../services/ui.service';
import {
  AuthenticationService,
  AuthUser
} from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

@Injectable()
export class InInterceptor implements HttpInterceptor {
  constructor(
    private uiService: UiService,
    private authenticationService: AuthenticationService,
    private authenticationApiService: AuthenticationApiService,
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
              if (this.authenticationService.userConnected$.value) {
                this.authenticationApiService.refreshToken().subscribe({
                  next: (res: AuthUser) => {
                    this.authenticationService.setAuthUser(res);
                  },
                  error: (err2: HttpErrorResponse) => {
                    if (err2.status === 401) {
                      this.authenticationService.removeAuthData();
                      this.uiService.displayToast(
                        'Votre session a expiré, veuillez vous reconnecter'
                      );
                      this.router.navigate(['/']);
                    }
                  }
                });
              }
            }
          }
        }
      )
    );
  }
}
