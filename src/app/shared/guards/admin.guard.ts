import { AuthenticationService } from './../services/authentication.service';
import { AuthenticationApiService } from './../services/api/authentication-api.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserRole } from '../classes/models/user.class';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private authenticationApiService: AuthenticationApiService
  ) {}

  canActivate(): Observable<boolean> {
    return this.authenticationApiService.hasRole(UserRole.ADMIN);
  }
}
