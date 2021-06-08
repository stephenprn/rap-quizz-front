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
    crawlArtist: this.BASE_URL + 'crawl-artists'
  };

  constructor(private restService: RestService) {}

  public crawlArtists(geniusIds: number[]): Observable<any> {
    const formData = new FormData();

    formData.append('genius_ids', geniusIds.join(','));

    return this.restService.post(this.URLS.crawlArtist, formData);
  }
}
