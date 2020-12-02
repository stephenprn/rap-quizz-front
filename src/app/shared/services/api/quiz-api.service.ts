import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable()
export class QuizApiService {
  private BASE_URL = '/quiz/';
  private URLS = {
    generate: this.BASE_URL + 'generate',
  };

  constructor(private restService: RestService) {}

  public generate(): Observable<any> {
    return this.restService.get(this.URLS.generate);
  }
}
