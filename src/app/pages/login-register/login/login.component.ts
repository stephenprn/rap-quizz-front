import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationApiService } from 'src/app/shared/services/api/authentication-api.service';
import {
  AuthenticationService,
  AuthUser
} from 'src/app/shared/services/authentication.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public readonly PASSWORD_MIN_LENGTH = 6;
  public ICONS = AppConstants.ICONS;

  public loginFormGroup: FormGroup;

  public submitting: boolean;

  constructor(
    private router: Router,
    private authenticationApiService: AuthenticationApiService,
    private authenticationService: AuthenticationService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.PASSWORD_MIN_LENGTH)
      ]),
      rememberMe: new FormControl(false)
    });
  }

  public login() {
    this.submitting = true;

    this.authenticationApiService
      .login(
        this.loginFormGroup.get('email').value,
        this.loginFormGroup.get('password').value
      )
      .subscribe({
        next: (res: AuthUser) => {
          this.authenticationService.setAuthUser(
            res,
            this.loginFormGroup.get('rememberMe').value
          );
          this.uiService.displayToast('Vous êtes connecté');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
          this.submitting = false;
        }
      });
  }
}
