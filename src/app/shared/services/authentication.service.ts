import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  private readonly STORAGE_TOKEN_KEY = 'access_token';

  public userConnected$ = new BehaviorSubject<boolean>(false);

  public token: string = null;

  constructor() {
    this.initToken();
  }

  private initToken() {
    const token = window.localStorage.getItem(this.STORAGE_TOKEN_KEY);

    if (token != null) {
      this.token = token;
      this.userConnected$.next(true);
    } else {
      this.token = null;
    }
  }

  public setToken(token: string, rememberMe: boolean): void {
    this.token = token;

    if (rememberMe) {
      window.localStorage.setItem(this.STORAGE_TOKEN_KEY, this.token);
    }

    this.userConnected$.next(true);
  }

  public removeToken(): void {
    this.token = null;
    window.localStorage.removeItem(this.STORAGE_TOKEN_KEY);

    this.userConnected$.next(false);
  }
}
