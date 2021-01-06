import { UiService } from './../../services/ui.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthenticationUiService } from '../../services/ui/authentication-ui.service';
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticationApiService } from '../../services/api/authentication-api.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(MatMenuTrigger) connectionMenuTrigger: MatMenuTrigger;

  private readonly MIN_DISTANCE_TOOLBAR_RED = 100;

  public userConnected: boolean;
  public homeScrolled: boolean = false;

  private promises = {
    userConnected: null,
    homeScrolled: null,
  };

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,

    private authenticationUiService: AuthenticationUiService,
    private uiService: UiService,
    private utilsService: UtilsService,
    private authenticationService: AuthenticationService,
    private authenticationApiService: AuthenticationApiService
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

    this.promises.homeScrolled = this.uiService.windowScroll$.subscribe(
      ({ top }) => {
        this.homeScrolled = top > this.MIN_DISTANCE_TOOLBAR_RED;
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  public openRegister() {
    this.authenticationUiService.displayRegisterDialog();
  }

  public openLogin() {
    this.authenticationUiService.displayLoginDialog();
  }

  public logout() {
    this.authenticationService.removeAuthData();
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

  public goAddQuestion() {
    this.router.navigate(['/add-question']);
  }

  public goHome() {
    this.router.navigate(['/']);
  }
}
