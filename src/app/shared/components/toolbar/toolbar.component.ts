import { UiService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginDialogComponent } from '../../dialogs/login/login-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  public userConnected: boolean;

  private promises = {
    userConnected: null,
  };

  constructor(
    private router: Router,

    private uiService: UiService,
    private utilsService: UtilsService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initPromises();
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribeAll(this.promises);
  }

  private initPromises() {
    this.promises.userConnected = this.authenticationService.userConnected$.subscribe(
      (state: boolean) => {
        this.userConnected = state;
      }
    );
  }

  public openLogin() {
    this.uiService.displayDialog(LoginDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  public logout() {
    this.authenticationService.removeToken();
  }

  public goAddArticle() {
    this.router.navigate(['/add-article']);
  }

  public goHome() {
    this.router.navigate(['/']);
  }
}
