import { AuthenticationApiService } from './../services/api/authentication-api.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoggedGuard implements CanActivate {
  constructor(private authenticationApiService: AuthenticationApiService) {}

  canActivate(): Observable<boolean> {
    return this.authenticationApiService.isLogged();
  }
}
