import { AuthenticationService } from './shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthenticationApiService } from './shared/services/api/authentication-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private authenticationApiService: AuthenticationApiService
  ) {}

  ngOnInit(): void {
    this.initTitleUpdator();
    this.checkLogged();
  }

  private initTitleUpdator() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          const rt = this.getChild(this.activatedRoute);

          rt.data.subscribe(data => {
            this.titleService.setTitle(data.title);
          });
        }
      });
  }

  private checkLogged() {
    if (!this.authenticationService.userConnected$.value) {
      return;
    }

    this.authenticationApiService.isLogged().subscribe({
      next: () => {},
      error: () => {
        this.authenticationService.removeAuthData();
      }
    });
  }

  private getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }
}
