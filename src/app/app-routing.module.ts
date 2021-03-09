import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './shared/guards/logged.guard';
import { QuizComponent } from './pages/quiz/quiz.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Question app' } },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    canActivate: [LoggedGuard],
  },
  {
    path: 'add-question',
    component: AddQuestionComponent,
    data: { title: 'Add question' },
    canActivate: [LoggedGuard],
  },
  {
    path: 'edit-question/:url',
    component: AddQuestionComponent,
    data: { title: 'Edit question' },
    canActivate: [LoggedGuard],
  },
  {
    path: 'quiz',
    component: QuizComponent,
    canActivate: [LoggedGuard],
    data: { title: 'New quiz' },
  },
  {
    path: 'quiz/:quiz_url',
    canActivate: [LoggedGuard],
    component: QuizComponent,
    data: { title: 'Quiz' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
