import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestParameter } from '../rest.service';
import { Response } from 'src/app/shared/classes/models/response.class';
import {
  Pagination,
  PaginationResults
} from '../../classes/others/pagination.class';
import { User } from '../../classes/models/user.class';

@Injectable()
export class UserApiService {
  private BASE_URL = '/user/';
  private URLS = {
    list: this.BASE_URL + 'list'
  };

  constructor(private restService: RestService) {}

  public list(pagination: Pagination): Observable<PaginationResults<User>> {
    return this.restService.get(this.URLS.list, null, pagination);
  }
}
