import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';

@Injectable()
export class UtilsService {
  constructor() {}

  normalizeString(text: string): string {
    return cloneDeep(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  unsubscribeAll(promises: any) {
    for (const key in promises) {
      if (promises[key] != null) {
        promises[key].unsubscribe();
        promises[key] = null;
      }
    }
  }
}
