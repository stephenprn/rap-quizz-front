import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Pagination } from '../classes/others/pagination.class';

export class RestParameter {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}


@Injectable()
export class RestService {
  private readonly PAGINATION_KEYS_NAMES = {
    pageNbr: 'page_nbr',
    nbrResults: 'nbr_results',
  };

  constructor(private http: HttpClient) {}

  public get(
    path: string,
    parameters?: RestParameter[],
    pagination?: Pagination
  ): Observable<any> {
    const httpParams = this.getParams(parameters, pagination);

    return this.http.get(environment.apiUrl + path, {
      params: httpParams,
    });
  }

  public post(
    path: string,
    body: any,
    parameters?: RestParameter[],
    pagination?: Pagination
  ): Observable<any> {
    const httpParams = this.getParams(parameters, pagination);

    return this.http.post(environment.apiUrl + path, body, {
      params: httpParams,
    });
  }

  public delete(
    path: string,
    parameters?: RestParameter[],
    pagination?: Pagination
  ) {
    const httpParams = this.getParams(parameters, pagination);

    return this.http.delete(environment.apiUrl + path, {
      params: httpParams,
    });
  }

  private getParams(parameters?: RestParameter[], pagination?: Pagination) {
    let httpParams = new HttpParams();

    if (parameters != null) {
      parameters.forEach((param: any) => {
        httpParams = httpParams.append(param.name, param.value);
      });
    }

    if (pagination != null) {
      httpParams = httpParams.append(
        this.PAGINATION_KEYS_NAMES.pageNbr,
        String(pagination.pageNbr)
      );

      if (pagination.nbrResults != null) {
        httpParams = httpParams.append(
          this.PAGINATION_KEYS_NAMES.nbrResults,
          String(pagination.nbrResults)
        );
      }
    }

    return httpParams;
  }
}
