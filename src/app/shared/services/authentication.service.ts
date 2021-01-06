import { User } from 'src/app/shared/classes/models/user.class';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

export class AuthUser {
  access_token: string;
  refresh_token?: string;
  user?: User;
}

@Injectable()
export class AuthenticationService {
  private readonly STORAGE_TOKEN_KEY = 'access_token';
  private readonly STORAGE_REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly STORAGE_USER_KEY = 'user';

  public userConnected$ = new BehaviorSubject<boolean>(false);

  private rememberMe: boolean;
  public token: string = null;
  public refreshToken: string = null;
  public user: User;

  constructor() {
    this.initAuthData();
  }

  private initAuthData() {
    this.token = window.localStorage.getItem(this.STORAGE_TOKEN_KEY);
    this.refreshToken = window.localStorage.getItem(
      this.STORAGE_REFRESH_TOKEN_KEY
    );

    const userStr = window.localStorage.getItem(this.STORAGE_USER_KEY);

    try {
      if (userStr != null) this.user = JSON.parse(userStr);
    } catch (e) {
      this.removeAuthData();
    }

    if (this.token) {
      this.userConnected$.next(true);
    }
  }

  public setAuthUser(authUser: AuthUser, rememberMe?: boolean): void {
    this.token = authUser.access_token;

    if (authUser.refresh_token != null)
      this.refreshToken = authUser.refresh_token;
    if (rememberMe != null) this.rememberMe = rememberMe;
    if (authUser.user != null) this.user = authUser.user;

    if (this.rememberMe) {
      window.localStorage.setItem(this.STORAGE_TOKEN_KEY, this.token);
      window.localStorage.setItem(
        this.STORAGE_REFRESH_TOKEN_KEY,
        this.refreshToken
      );
      window.localStorage.setItem(
        this.STORAGE_USER_KEY,
        JSON.stringify(this.user)
      );
    }

    this.userConnected$.next(true);
  }

  public removeAuthData(): void {
    this.token = null;
    this.refreshToken = null;
    this.user = null;

    window.localStorage.removeItem(this.STORAGE_TOKEN_KEY);
    window.localStorage.removeItem(this.STORAGE_REFRESH_TOKEN_KEY);
    window.localStorage.removeItem(this.STORAGE_USER_KEY);

    this.userConnected$.next(false);
  }
}
