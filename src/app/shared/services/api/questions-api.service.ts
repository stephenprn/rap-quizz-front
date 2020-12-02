import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/shared/classes/response.class';
import { RestService } from '../rest.service';

@Injectable()
export class QuestionsApiService {
  private BASE_URL = '/question/';
  private URLS = {
    add: this.BASE_URL + 'add',
  };

  constructor(private restService: RestService) {}

  public add(label: string, response: Response): Observable<any> {
    const formData = new FormData();

    formData.append('label', label);
    formData.append('response_uuid', response.uuid);

    return this.restService.post(this.URLS.add, formData);
  }
}
