import { Question } from './../../classes/models/question.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';
import {
  RestPagination,
  RestPaginationResults,
  RestParameter,
  RestService,
} from '../rest.service';

@Injectable()
export class QuestionsApiService {
  private BASE_URL = '/question/';
  private URLS = {
    add: this.BASE_URL + 'add',
    list: this.BASE_URL + 'list',
    hide: this.BASE_URL + 'hide/',
  };

  constructor(private restService: RestService) {}

  public add(label: string, response: Response): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('response_uuid', response.uuid);

    return this.restService.post(this.URLS.add, formData);
  }

  public list(
    pagination: RestPagination
  ): Observable<RestPaginationResults<Question>> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public setHidden(question: Question, hidden: boolean): Observable<void> {
    const params: RestParameter[] = [
      { name: 'hidden', value: String(hidden) },
    ];

    return this.restService.get(this.URLS.hide + question.uuid, params);
  }
}
