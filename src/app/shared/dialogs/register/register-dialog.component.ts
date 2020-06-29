import { UiService } from '../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthenticationApiService } from '../../services/api/authentication-api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login/login-dialog.component';

@Component({
  selector: 'app-register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public readonly PASSWORD_MIN_LENGTH = 6;
  public readonly PASSWORD_MAX_LENGTH = 20;
  public readonly USERNAME_MIN_LENGTH = 4;
  public readonly USERNAME_MAX_LENGTH = 100;

  public readonly USERNAME_CHECK_REFRESH_DELAY = 250;
  private checkUsernameTimeOut: any;

  public registerFormGroup: FormGroup;

  public usernameExists = {
    loading: false,
    state: false,
  };

  constructor(
    public dialogRef: MatDialogRef<RegisterDialogComponent>,

    private authenticationApiService: AuthenticationApiService,
    private authenticationService: AuthenticationService,
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
          Validators.maxLength(this.USERNAME_MAX_LENGTH),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIN_LENGTH),
          Validators.maxLength(this.PASSWORD_MAX_LENGTH),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIN_LENGTH),
          Validators.maxLength(this.PASSWORD_MAX_LENGTH),
        ]),
      },
      this.passwordMatch.bind(this)
    );

    this.registerFormGroup
      .get('username')
      .valueChanges.subscribe((username: string) => {
        this.checkUsername(username);
      });
  }

  public register() {
    this.authenticationApiService
      .register(
        this.registerFormGroup.get('email').value,
        this.registerFormGroup.get('username').value,
        this.registerFormGroup.get('password').value
      )
      .subscribe(
        (res: any) => {
          this.uiService.displayToast('You are now registered!');
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error, true);
        }
      );
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

      this.authenticationApiService.checkUsername(username).subscribe(
        () => {
          this.usernameExists.state = false;
          this.registerFormGroup.get('username').setErrors(null);
          console.log(this.registerFormGroup.get('username'));
        },
        () => {
          this.registerFormGroup.get('username').setErrors({ invalid: true });
          this.usernameExists.state = true;
        },
        () => {
          this.usernameExists.loading = false;
        }
      );
    }, this.USERNAME_CHECK_REFRESH_DELAY);
  }

  public openLoginDialog() {
    this.uiService.displayDialog(LoginDialogComponent, {
      width: '600px',
      height: '400px',
    });
    this.dialogRef.close();
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
