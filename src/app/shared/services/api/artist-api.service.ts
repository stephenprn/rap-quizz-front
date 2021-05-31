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
export class ArtistApiService {
  private BASE_URL = '/artist/';
  private URLS = {
    list: this.BASE_URL + 'list',
    generateQuestions: this.BASE_URL + 'generate-questions'
  };

  constructor(private restService: RestService) {}

  public list(pagination: Pagination): Observable<any> {
    return this.restService.get(this.URLS.list, null, pagination);
  }

  public generateQuestions(artistUuid: string): Observable<any> {
    return this.restService.post(this.URLS.generateQuestions, {
      artist_uuid: artistUuid
    });
  }
}
