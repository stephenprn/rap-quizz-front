import { Question } from './../../classes/models/question.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';
import { RestParameter, RestService } from '../rest.service';
import {
  Pagination,
  PaginationResults,
} from '../../classes/others/pagination.class';

@Injectable()
export class QuestionsApiService {
  private BASE_URL = '/question/';
  private URLS = {
    add: this.BASE_URL + 'add',
    list: this.BASE_URL + 'list',
    edit: this.BASE_URL + 'edit/',
  };

  constructor(private restService: RestService) {}

  public add(
    label: string,
    rightResponse: Response,
    falseResponses: Response[]
  ): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('true_response_uuid', rightResponse.uuid);
    formData.append(
      'false_responses_uuid',
      falseResponses.map((r) => r.uuid).join(',')
    );

    return this.restService.post(this.URLS.add, formData);
  }

  public list(pagination: Pagination): Observable<PaginationResults<Question>> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public editQuestion(
    question: Question,
    {
      label,
      hidden,
    }: {
      label?: string;
      hidden?: boolean;
    }
  ): Observable<void> {
    const params: RestParameter[] = [];

    if (label != null) {
      params.push({ name: 'label', value: label });
    }

    if (hidden != null) {
      params.push({ name: 'edit', value: String(hidden) });
    }

    return this.restService.get(this.URLS.edit + question.uuid, params);
  }
}
