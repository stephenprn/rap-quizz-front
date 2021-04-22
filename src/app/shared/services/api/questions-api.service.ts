import { Question } from './../../classes/models/question.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';
import { RestParameter, RestService } from '../rest.service';
import {
  Pagination,
  PaginationResults
} from '../../classes/others/pagination.class';

@Injectable()
export class QuestionsApiService {
  private BASE_URL = '/question/';
  private URLS = {
    add: this.BASE_URL + 'add',
    list: this.BASE_URL + 'list',
    edit: this.BASE_URL + 'edit/',
    get: this.BASE_URL + ''
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

  public get(uuid: string): Observable<Question> {
    return this.restService.get(this.URLS.get + uuid);
  }

  public editQuestion(
    uuid: string,
    {
      label,
      hidden,
      rightResponse,
      falseResponses
    }: {
      label?: string;
      hidden?: boolean;
      rightResponse?: Response;
      falseResponses?: Response[];
    }
  ): Observable<void> {
    const formData = new FormData();

    if (label != null) {
      formData.append('label', label);
    }

    if (hidden != null) {
      formData.append('edit', String(hidden));
    }

    if (rightResponse != null) {
      formData.append('true_response_uuid', rightResponse.uuid);
    }

    if (falseResponses != null) {
      formData.append(
        'false_responses_uuid',
        falseResponses.map((r) => r.uuid).join(',')
      );
    }

    return this.restService.post(this.URLS.edit + uuid, formData);
  }
}
