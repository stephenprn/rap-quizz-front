import { LoginRegisterComponent } from './pages/login-register/login-register.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedGuard } from './shared/guards/logged.guard';
import { QuizComponent } from './pages/quiz/quiz.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Rap quiz' } },
  {
    path: 'login',
    component: LoginRegisterComponent,
    data: { title: 'Se connecter', login: true },
  },
  {
    path: 'register',
    component: LoginRegisterComponent,
    data: { title: 'Créer un compte', login: false },
  },
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
  {
    path: 'admin',
    canActivate: [LoggedGuard, AdminGuard],
    data: { title: 'Console admin' },
    component: AdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
