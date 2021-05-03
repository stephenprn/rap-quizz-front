import { UiService } from './services/ui.service';
import { NgModule } from '@angular/core';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RestService } from './services/rest.service';
import { AuthenticationService } from './services/authentication.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InInterceptor } from './interceptors/in.interceptor';
import { QuestionsApiService } from './services/api/questions-api.service';
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
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ConfirmationDialogComponent } from './dialogs/confirmation/confirmation-dialog.component';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { AuthenticationUiService } from './services/ui/authentication-ui.service';
import { ResponseApiService } from './services/api/response-api.service';
import { QuizApiService } from './services/api/quiz-api.service';
import { ProfileApiService } from './services/api/profile-api.service';
import { BasicButtonComponent } from './components/basic-button/basic-button.component';
import { DurationPipe } from './pipes/duration.pipe';
import { AdminGuard } from './guards/admin.guard';
import { BasicPaginationComponent } from './components/basic-pagination/basic-pagination.component';
import { BasicLoaderComponent } from './components/basic-loader/basic-loader.component';
import { BasicTabsComponent } from './components/basic-tabs/basic-tabs.component';
import { BasicParagraphComponent } from './components/basic-paragraph/basic-paragraph.component';
import { UserApiService } from './services/api/user-api.service';
import { AdminApiService } from './services/api/admin-api.service';

@NgModule({
  declarations: [
    ToolbarComponent,

    ConfirmationDialogComponent,

    BasicButtonComponent,
    BasicPaginationComponent,
    BasicLoaderComponent,
    BasicTabsComponent,
    BasicParagraphComponent,

    SanitizeHtmlPipe,
    DurationPipe
  ],
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
    MatTooltipModule,
    MatToolbarModule,

    CdkScrollableModule
  ],
  exports: [
    BasicButtonComponent,
    BasicPaginationComponent,
    BasicLoaderComponent,
    BasicTabsComponent,
    BasicParagraphComponent,

    ToolbarComponent,
    SanitizeHtmlPipe,
    DurationPipe
  ],
  providers: [
    UiService,
    AuthenticationService,
    RestService,
    UtilsService,
    AuthenticationUiService,
    ResponseApiService,
    UserApiService,

    QuestionsApiService,
    AuthenticationApiService,
    QuizApiService,
    ProfileApiService,
    AdminApiService,

    SanitizeHtmlPipe,
    DurationPipe,

    LoggedGuard,
    AdminGuard,

    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: OutInterceptor, multi: true },
    Title
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class SharedModule {}
