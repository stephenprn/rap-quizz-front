import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationApiService } from '../../services/api/authentication-api.service';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationUiService } from '../../services/ui/authentication-ui.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent implements OnInit {
  public readonly PASSWORD_MIN_LENGTH = 6;

  public loginFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,

    private authenticationApiService: AuthenticationApiService,
    private authenticationService: AuthenticationService,
    private authenticationUiService: AuthenticationUiService,
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
        Validators.minLength(this.PASSWORD_MIN_LENGTH),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  public login() {
    this.authenticationApiService
      .login(
        this.loginFormGroup.get('email').value,
        this.loginFormGroup.get('password').value
      )
      .subscribe(
        (res: any) => {
          this.authenticationService.setToken(
            res.access_token,
            this.loginFormGroup.get('rememberMe').value
          );
          this.uiService.displayToast('You are now connected!');
          this.dialogRef.close();
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      );
  }

  public openRegisterDialog() {
    this.authenticationUiService.displayRegisterDialog();
    this.dialogRef.close();
  }
}
