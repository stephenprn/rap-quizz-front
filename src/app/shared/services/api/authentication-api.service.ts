import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable()
export class AuthenticationApiService {
  private BASE_URL = '/auth/';
  private URLS = {
    login: this.BASE_URL + 'login',
    isLogged: this.BASE_URL + 'check-logged',
  };

  constructor(private restService: RestService) {}

  public login(email: string, password): Observable<any> {
    const body = {
      email,
      password,
    };

    return this.restService.post(this.URLS.login, body);
  }

  public isLogged() {
    return this.restService.get(this.URLS.isLogged);
  }
}
