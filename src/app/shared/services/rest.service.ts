import { Observable } from 'rxjs/internal/Observable';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

export class RestParameter {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

export class RestPagination {
  pageNbr: number;
  nbrResults?: number;

  constructor(pageNbr?: number, nbrResults?: number) {
    if (pageNbr == null) {
      this.pageNbr = 0;
    } else {
      this.pageNbr = pageNbr;
    }

    if (nbrResults != null) {
      this.nbrResults = nbrResults;
    }
  }
}

export class RestPaginationResults<T> {
  total: number;
  data: T[];
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
    pagination?: RestPagination
  ): Observable<any> {
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

    return this.http.get(environment.apiUrl + path, {
      params: httpParams,
    });
  }

  public post(
    path: string,
    body: any,
    parameters?: RestParameter[],
    pagination?: RestPagination
  ): Observable<any> {
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

    return this.http.post(environment.apiUrl + path, body, {
      params: httpParams,
    });
  }
}
