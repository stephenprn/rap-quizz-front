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

@Component({
  selector: 'app-dialog-register',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss'],
})
export class RegisterDialogComponent implements OnInit {
  public readonly PASSWORD_MIN_LENGTH = 6;
  public readonly PASSWORD_MAX_LENGTH = 20;
  public readonly USERNAME_MIN_LENGTH = 8;
  public readonly USERNAME_MAX_LENGTH = 100;

  public readonly USERNAME_CHECK_REFRESH_DELAY = 250;
  private checkUsernameTimeOut: any;

  public registerFormGroup: FormGroup;

  public usernameExists = false;

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
          Validators.minLength(this.PASSWORD_MAX_LENGTH),
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(this.PASSWORD_MIN_LENGTH),
          Validators.minLength(this.PASSWORD_MAX_LENGTH),
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
          this.authenticationService.setToken(
            res.access_token,
            this.registerFormGroup.get('rememberMe').value
          );
          this.uiService.displayToast('You are now connected!');
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      );
  }

  public checkUsername(username: string) {
    this.registerFormGroup.get('username').setErrors({ invalid: true });

    this.checkUsernameTimeOut = setTimeout(() => {
      this.checkUsernameTimeOut = null;
      this.authenticationApiService.checkUsername(username).subscribe(
        () => {
          this.usernameExists = false;
          this.registerFormGroup.get('username').setErrors({ invalid: false });
        },
        () => {
          this.usernameExists = true;
        }
      );
    }, this.USERNAME_CHECK_REFRESH_DELAY);
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
