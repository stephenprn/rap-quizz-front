import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
@Injectable()
export class AuthenticationUiService {
  screenMode$ = new BehaviorSubject<'desktop' | 'mobile' | 'tablet'>(null);
  windowScroll$ = new BehaviorSubject<number>(null);
}
