import { AuthenticationService } from './../services/authentication.service';
import { AuthenticationApiService } from './../services/api/authentication-api.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(
    private authenticationApiService: AuthenticationApiService,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    if (this.authenticationService.userConnected$.value) {
      return this.authenticationApiService.isLogged();
    } else {
      return false;
    }
  }
}
