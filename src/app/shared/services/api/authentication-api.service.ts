import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable()
export class AuthenticationApiService {
  private BASE_URL = '/auth/';
  private URLS = {
    login: this.BASE_URL + 'login',
    register: this.BASE_URL + 'register',
    checkUsername: this.BASE_URL + 'check-username',
    isLogged: this.BASE_URL + 'check-logged',
  };

  constructor(private restService: RestService) {}

  public login(email: string, password: string): Observable<any> {
    const body = {
      email,
      password,
    };

    return this.restService.post(this.URLS.login, body);
  }

  public register(
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    const body = {
      email,
      username,
      password,
    };

    return this.restService.post(this.URLS.register, body);
  }

  public checkUsername(username: string) {
    const body = {
      username,
    };

    return this.restService.post(this.URLS.checkUsername, body);
  }

  public isLogged() {
    return this.restService.get(this.URLS.isLogged);
  }
}
