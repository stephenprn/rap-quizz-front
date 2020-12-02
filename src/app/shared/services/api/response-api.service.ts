import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestParameter } from '../rest.service';

@Injectable()
export class ResponseApiService {
  private BASE_URL = '/response/';
  private URLS = {
    search: this.BASE_URL + 'search',
    add: this.BASE_URL + 'add',
  };

  constructor(private restService: RestService) {}

  public search(searchTxt: string, type: ResponseType): Observable<any> {
    const params = [
      new RestParameter('search_txt', searchTxt),
      new RestParameter('type', type),
    ];

    return this.restService.get(this.URLS.search, params);
  }

  public add(label: string, type: ResponseType): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('type', type);

    return this.restService.post(this.URLS.add, formData);
  }
}
