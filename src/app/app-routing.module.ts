import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { LoggedGuard } from './shared/guards/logged.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article-details/:url', component: ArticleDetailsComponent },
  { path: 'add-article', component: AddArticleComponent, canActivate: [LoggedGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
