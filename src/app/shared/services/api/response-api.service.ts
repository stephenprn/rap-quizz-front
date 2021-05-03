import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestParameter } from '../rest.service';
import { Response } from 'src/app/shared/classes/models/response.class';
import {
  Pagination,
  PaginationResults
} from '../../classes/others/pagination.class';

@Injectable()
export class ResponseApiService {
  private BASE_URL = '/response/';
  private URLS = {
    search: this.BASE_URL + 'search',
    add: this.BASE_URL + 'add',
    list: this.BASE_URL + 'list',
    edit: this.BASE_URL + 'edit/'
  };

  constructor(private restService: RestService) {}

  public search(
    searchTxt: string,
    type: ResponseType,
    responsesToExclude: Response[]
  ): Observable<any> {
    const params = [
      new RestParameter('search_txt', searchTxt),
      new RestParameter('type', type),
      new RestParameter(
        'responses_uuid_exclude',
        responsesToExclude.map((r) => r.uuid).join(',')
      )
    ];

    return this.restService.get(this.URLS.search, params);
  }

  public add(label: string, type: ResponseType): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('type', type);

    return this.restService.post(this.URLS.add, formData);
  }

  public list(pagination: Pagination): Observable<PaginationResults<Response>> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public editResponse(
    uuid: string,
    {
      label,
      hidden
    }: {
      label?: string;
      hidden?: boolean;
    }
  ): Observable<void> {
    const formData = new FormData();

    if (label != null) {
      formData.append('label', label);
    }

    if (hidden != null) {
      formData.append('hidden', String(hidden));
    }

    return this.restService.post(this.URLS.edit + uuid, formData);
  }
}
