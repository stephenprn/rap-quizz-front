import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestPagination } from '../rest.service';

@Injectable()
export class ArticlesApiService {
  private BASE_URL = '/article/';
  private URLS = {
    list: this.BASE_URL + 'articles-list',
    details: this.BASE_URL + 'article-details/',
    add: this.BASE_URL + 'add-article',
  };

  constructor(private restService: RestService) {}

  public getArticlesList(pagination: RestPagination): Observable<any> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public getArticleDetails(url: string): Observable<any> {
    return this.restService.get(this.URLS.details + url);
  }

  public addArticle(title: string, body: string) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', body);

    return this.restService.post(this.URLS.add, formData);
  }
}
