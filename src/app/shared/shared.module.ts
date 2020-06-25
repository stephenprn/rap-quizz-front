import { ArticleItemComponent } from './components/article-item/article-item.component';
import { UiService } from './services/ui.service';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginDialogComponent } from './dialogs/login/login-dialog.component';
import { RestService } from './services/rest.service';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InInterceptor } from './interceptors/in.interceptor';
import { ArticlesApiService } from './services/api/articles-api.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationApiService } from './services/api/authentication-api.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UtilsService } from './services/utils.service';
import { CommonModule } from '@angular/common';
import { LoggedGuard } from './guards/logged.guard';
import { OutInterceptor } from './interceptors/out.interceptor';
import {MatMenuModule} from '@angular/material/menu';
import { RegisterDialogComponent } from './dialogs/register/register-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [ToolbarComponent, ArticleItemComponent, LoginDialogComponent, RegisterDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    HttpClientModule,

    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [ToolbarComponent, ArticleItemComponent],
  providers: [
    UiService,
    AuthenticationService,
    RestService,
    UtilsService,

    ArticlesApiService,
    AuthenticationApiService,

    LoggedGuard,

    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OutInterceptor, multi: true },
  ],
  entryComponents: [LoginDialogComponent, RegisterDialogComponent],
})
export class SharedModule {}
