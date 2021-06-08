import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestParameter } from '../rest.service';
import {
  Pagination,
  PaginationResults
} from '../../classes/others/pagination.class';
import { User, UserRole } from '../../classes/models/user.class';

@Injectable()
export class UserApiService {
  private BASE_URL = '/user/';
  private URLS = {
    list: this.BASE_URL + 'list',
    edit: this.BASE_URL + 'edit/'
  };

  constructor(private restService: RestService) {}

  public list(pagination: Pagination): Observable<PaginationResults<User>> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public editUser(
    uuid: string,
    {
      role
    }: {
      role?: UserRole;
    }
  ): Observable<void> {
    const formData = new FormData();

    role != null && formData.append('role', String(role));

    return this.restService.post(this.URLS.edit + uuid, formData);
  }
}
