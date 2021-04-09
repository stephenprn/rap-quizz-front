import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { UserQuiz } from '../../classes/models/quiz.class';
import { Pagination, PaginationResults } from '../../classes/others/pagination.class';

@Injectable()
export class ProfileApiService {
  private BASE_URL = '/profile/';
  private URLS = {
    history: this.BASE_URL + 'history',
  };

  constructor(private restService: RestService) {}

  public getHistory(pagination: Pagination): Observable<PaginationResults<UserQuiz>> {
    return this.restService.get(this.URLS.history, null, pagination);
  }
}
