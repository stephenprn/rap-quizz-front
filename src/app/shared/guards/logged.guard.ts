import { AuthenticationService } from './../services/authentication.service';
import { AuthenticationApiService } from './../services/api/authentication-api.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    console.log('user connected', this.authenticationService.userConnected$.value);
    return this.authenticationService.userConnected$.value;
  }
}
