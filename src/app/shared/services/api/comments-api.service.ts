import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestPagination } from '../rest.service';

@Injectable()
export class CommentsApiService {
  private BASE_URL = '/comment/';
  private URLS = {
    comment: this.BASE_URL + 'comment-article/',
    list: this.BASE_URL + 'comments-list/',
  };

  constructor(private restService: RestService) {}

  public getComments(url: string, pagination: RestPagination): Observable<any> {
    return this.restService.get(this.URLS.list + url, null, pagination);
  }

  public commentArticle(url: string, body: string): Observable<any> {
    const formData = new FormData();

    formData.append('body', body);

    return this.restService.post(this.URLS.comment + url, formData);
  }
}
