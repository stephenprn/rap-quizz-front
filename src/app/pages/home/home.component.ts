import { Router } from '@angular/router';
import { Article } from './../../shared/classes/article.class';
import { Component, OnInit } from '@angular/core';
import {
  RestPagination,
  RestPaginationResults,
} from 'src/app/shared/services/rest.service';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private readonly pagination: RestPagination = new RestPagination();

  public articles: Article[];
  public totalArticles: number;

  public loading: boolean; // indicator for general loading
  public loadingMore: boolean; // indicator for loading more results

  constructor(
    private articlesApiService: ArticlesApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getArticles(true);
  }

  public getArticles(reset?: boolean) {
    if (reset) {
      this.articles = [];
      this.loading = true;
      this.loadingMore = false;
    } else {
      this.loadingMore = true;
    }

    this.articlesApiService
      .getArticlesList(this.pagination)
      .subscribe((res: RestPaginationResults<Article>) => {
        this.articles.push(...res.data);

        if (reset) {
          this.totalArticles = res.total;
        }

        this.loading = false;
        this.loadingMore = false;
      });
  }

  public openArticle(url: string) {
    this.router.navigate(['/article-details', url]);
  }
}
