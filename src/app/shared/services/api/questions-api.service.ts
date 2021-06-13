import {
  Question,
  QuestionSubType
} from './../../classes/models/question.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';
import { RestService } from '../rest.service';
import {
  Pagination,
  PaginationResults
} from '../../classes/others/pagination.class';
import { ResponseType } from 'src/app/shared/classes/models/response.class';

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
    responseType: ResponseType,
    ranking: boolean,
    explaination: string,
    rightResponse: Response,
    falseResponses: Response[],
    rankedResponses: Response[],
    year: number
  ): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('response_type', responseType);
    formData.append('explaination', explaination);

    rightResponse && formData.append('true_response_uuid', rightResponse.uuid);
    falseResponses &&
      formData.append(
        'false_responses_uuid',
        falseResponses.map((r) => r.uuid).join(',')
      );
    rankedResponses &&
      formData.append(
        'ranked_responses_uuid',
        rankedResponses.map((r) => r.uuid).join(',')
      );
    year && formData.append('year', String(year));

    formData.append('ranking', String(ranking));

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
      responseType,
      subType,
      ranking,
      explaination,
      hidden,
      rightResponse,
      falseResponses,
      rankedResponses,
      year
    }: {
      label?: string;
      responseType?: ResponseType;
      subType?: QuestionSubType;
      ranking?: boolean;
      explaination?: string;
      hidden?: boolean;
      rightResponse?: Response;
      falseResponses?: Response[];
      rankedResponses?: Response[];
      year?: number;
    }
  ): Observable<void> {
    const formData = new FormData();

    label && formData.append('label', label);
    responseType && formData.append('response_type', responseType);
    subType && formData.append('sub_type', subType);
    hidden != null && formData.append('hidden', String(hidden));
    explaination != null && formData.append('explaination', explaination);
    rightResponse && formData.append('true_response_uuid', rightResponse.uuid);
    falseResponses &&
      formData.append(
        'false_responses_uuid',
        falseResponses.map((r) => r.uuid).join(',')
      );
    rankedResponses &&
      formData.append(
        'ranked_responses_uuid',
        rankedResponses.map((r) => r.uuid).join(',')
      );
    year && formData.append('year', String(year));
    ranking != null && formData.append('ranking', String(ranking));

    return this.restService.post(this.URLS.edit + uuid, formData);
  }
}
