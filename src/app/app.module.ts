import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from './pages/login-register/register/register.component';
import { LoginComponent } from './pages/login-register/login/login.component';
import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { QuestionComponent } from './pages/quiz/question/question.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from './pages/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ResponseComponent } from './pages/quiz/question/response/response.component';
import { QuizInfosComponent } from './pages/quiz/quiz-infos/quiz-infos.component';
import { QuizEndingSummaryComponent } from './pages/quiz/quiz-ending-summary/quiz-ending-summary.component';
import { QuizLoadingComponent } from './pages/quiz/quiz-loading/quiz-loading.component';
import { QuizWaitingRoomComponent } from './pages/quiz/quiz-waiting-room/quiz-waiting-room.component';
import { QuizSocketService } from './shared/services/quiz-socket.service';
import { QuizInitComponent } from './pages/home/quiz-init/quiz-init.component';
import { QuizStartingComponent } from './pages/quiz/quiz-starting/quiz-starting.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { QuizPlayerComponent } from './pages/quiz/quiz-player/quiz-player.component';
import { QuizEndingMedalComponent } from './pages/quiz/quiz-ending-summary/quiz-ending-medal/quiz-ending-medal.component';
import { AdminComponent } from './pages/admin/admin.component';
import { QuestionsListComponent } from './pages/admin/questions-list/questions-list.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    QuizInitComponent,
    LoginRegisterComponent,
    AdminComponent,

    QuizInfosComponent,

    AddQuestionComponent,

    LoginComponent,
    RegisterComponent,

    QuizComponent,
    QuizInfosComponent,
    QuizLoadingComponent,
    QuizWaitingRoomComponent,
    QuizStartingComponent,
    QuizEndingSummaryComponent,
    QuizEndingMedalComponent,
    QuizPlayerComponent,

    DashboardComponent,

    QuestionComponent,
    ResponseComponent,

    QuestionsListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,

    SharedModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [QuizSocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
