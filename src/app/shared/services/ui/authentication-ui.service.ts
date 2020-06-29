import { UiService } from 'src/app/shared/services/ui.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LoginDialogComponent } from '../../dialogs/login/login-dialog.component';
import { RegisterDialogComponent } from '../../dialogs/register/register-dialog.component';

@Injectable()
export class AuthenticationUiService {
  screenMode$ = new BehaviorSubject<'desktop' | 'mobile' | 'tablet'>(null);
  windowScroll$ = new BehaviorSubject<number>(null);

  constructor(private uiService: UiService) {}

  public displayLoginDialog() {
    this.uiService.displayDialog(LoginDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  public displayRegisterDialog() {
    this.uiService.displayDialog(RegisterDialogComponent, {
      width: '600px',
      height: '600px',
    });
  }
}
