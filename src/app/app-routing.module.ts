import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { LoggedGuard } from './shared/guards/logged.guard';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Article app' } },
  { path: 'article-details/:url', component: ArticleDetailsComponent, data: { title: 'View article' } },

  { path: 'add-article', component: AddArticleComponent, data: { title: 'Add an article' }, canActivate: [LoggedGuard] },
  { path: 'edit-article/:url', component: AddArticleComponent, data: { title: 'Edit an article' }, canActivate: [LoggedGuard] },
  { path: 'dashboard', component: DashboardComponent, data: { title: 'My dashboard' }, canActivate: [LoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
