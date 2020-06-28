import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService, RestPagination } from '../rest.service';

@Injectable()
export class ArticlesApiService {
  private BASE_URL = '/article/';
  private URLS = {
    list: this.BASE_URL + 'articles-list',
    myList: this.BASE_URL + 'my-articles-list',

    details: this.BASE_URL + 'article-details/',
    myDetails: this.BASE_URL + 'my-article-details/',

    add: this.BASE_URL + 'add-article',
    update: this.BASE_URL + 'update-article/',
    delete: this.BASE_URL + 'delete-article/'
  };

  constructor(private restService: RestService) {}

  public getArticlesList(pagination: RestPagination): Observable<any> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public getMyArticlesList(pagination: RestPagination): Observable<any> {
    return this.restService.get(this.URLS.myList, null, pagination);
  }

  public getArticleDetails(url: string): Observable<any> {
    return this.restService.get(this.URLS.details + url);
  }

  public getMyArticleDetails(url: string): Observable<any> {
    return this.restService.get(this.URLS.myDetails + url);
  }

  public addArticle(title: string, body: string) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', body);

    return this.restService.post(this.URLS.add, formData);
  }

  public updateArticle(title: string, body: string, url: string) {
    const formData = new FormData();

    formData.append('title', title);
    formData.append('body', body);

    return this.restService.post(this.URLS.update + url, formData);

  }

  public deleteArticle(url: string) {
    return this.restService.delete(this.URLS.delete + url);
  }
}
