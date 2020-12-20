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
import { LoadingQuizComponent } from './pages/quiz/loading-quiz/loading-quiz.component';
import { EndingQuizSummaryComponent } from './pages/quiz/ending-quiz-summary/ending-quiz-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddQuestionComponent,

    QuizComponent,
    QuestionComponent,
    ResponseComponent,
    LoadingQuizComponent,
    EndingQuizSummaryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonToggleModule,

    SharedModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
