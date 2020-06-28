import { UiService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LoginDialogComponent } from '../../dialogs/login/login-dialog.component';
import { AuthenticationService } from '../../services/authentication.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { RegisterDialogComponent } from '../../dialogs/register/register-dialog.component';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) connectionMenuTrigger: MatMenuTrigger;

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

  public openRegister() {
    this.uiService.displayDialog(RegisterDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  public openLogin() {
    this.uiService.displayDialog(LoginDialogComponent, {
      width: '600px',
      height: '400px',
    });
  }

  public logout() {
    this.authenticationService.removeToken();
    this.uiService.displayToast('You have been logged out');

    // check if current route require auth
    const currentRouteConfig = this.router.config.find(
      (f) => f.path === this.router.url.substr(1)
    );
    if (currentRouteConfig != null && currentRouteConfig.canActivate != null) {
      this.router.navigate(['/']);
    }
  }

  public goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  public goAddArticle() {
    this.router.navigate(['/add-article']);
  }

  public goHome() {
    this.router.navigate(['/']);
  }
}
