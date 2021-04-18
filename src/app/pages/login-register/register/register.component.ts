import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationApiService } from 'src/app/shared/services/api/authentication-api.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { AuthenticationUiService } from 'src/app/shared/services/ui/authentication-ui.service';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public readonly PASSWORD_MIN_LENGTH = 6;
  public readonly PASSWORD_MAX_LENGTH = 20;
  public readonly USERNAME_MIN_LENGTH = 4;
  public readonly USERNAME_MAX_LENGTH = 100;

  public ICONS = AppConstants.ICONS;

  public readonly USERNAME_CHECK_REFRESH_DELAY = 250;
  private checkUsernameTimeOut: any;

  public registerFormGroup: FormGroup;

  public submitting: boolean;

  public usernameExists = {
    loading: false,
    state: false
  };

  constructor(
    private router: Router,
    private authenticationApiService: AuthenticationApiService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  private initRegisterForm() {
    this.registerFormGroup = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(this.USERNAME_MIN_LENGTH),
          Validators.maxLength(this.USERNAME_MAX_LENGTH)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIN_LENGTH),
          Validators.maxLength(this.PASSWORD_MAX_LENGTH)
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIN_LENGTH),
          Validators.maxLength(this.PASSWORD_MAX_LENGTH)
        ])
      },
      this.passwordMatch.bind(this)
    );

    this.registerFormGroup.get('username').valueChanges.subscribe({
      next: (username: string) => {
        this.checkUsername(username);
      }
    });
  }

  public register() {
    this.submitting = true;

    this.authenticationApiService
      .register(
        this.registerFormGroup.get('email').value,
        this.registerFormGroup.get('username').value,
        this.registerFormGroup.get('password').value
      )
      .subscribe({
        next: () => {
          this.uiService.displayToast('You are now registered!');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.uiService.displayToast(err.error, true);
        }
      });
  }

  private checkUsername(username: string) {
    if (this.checkUsernameTimeOut != null) {
      clearTimeout(this.checkUsernameTimeOut);
    }

    if (
      username.length < this.USERNAME_MIN_LENGTH ||
      username.length > this.USERNAME_MAX_LENGTH
    ) {
      return;
    }

    this.checkUsernameTimeOut = setTimeout(() => {
      this.usernameExists.loading = true;
      this.checkUsernameTimeOut = null;

      this.authenticationApiService.checkUsername(username).subscribe({
        next: () => {
          this.usernameExists.state = false;
          this.usernameExists.loading = false;
          this.registerFormGroup.get('username').setErrors(null);
        },
        error: () => {
          this.registerFormGroup.get('username').setErrors({ invalid: true });
          this.usernameExists.loading = false;
          this.usernameExists.state = true;
        }
      });
    }, this.USERNAME_CHECK_REFRESH_DELAY);
  }

  public openLoginDialog() {
    this.router.navigate(['/login']);
  }

  private passwordMatch(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('passwordConfirmation').value) {
      this.registerFormGroup
        .get('passwordConfirmation')
        .setErrors({ invalid: true });
      return { invalid: true };
    }
  }
}
