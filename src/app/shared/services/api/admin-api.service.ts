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
export class AdminApiService {
  private BASE_URL = '/admin/';
  private URLS = {
    crawlArtist: this.BASE_URL + 'crawl-artist/'
  };

  constructor(private restService: RestService) {}

  public crawlArtist(geniusId: number): Observable<any> {
    return this.restService.get(this.URLS.crawlArtist + geniusId.toString());
  }
}
