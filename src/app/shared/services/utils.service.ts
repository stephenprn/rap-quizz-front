import { Injectable } from '@angular/core';
import cloneDeep from 'lodash/cloneDeep';

@Injectable()
export class UtilsService {
  constructor() {}

  public normalizeString(text: string): string {
    return cloneDeep(text)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  public unsubscribeAll(promises: any) {
    for (const key in promises) {
      if (promises[key] != null) {
        promises[key].unsubscribe();
        promises[key] = null;
      }
    }
  }

  public getCurrentUrl(withoutParams?: boolean) {
    if (!!withoutParams) {
      return (
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname
      );
    } else {
      return window.location.href;
    }
  }

  public copyToClipboard(text: string) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
}