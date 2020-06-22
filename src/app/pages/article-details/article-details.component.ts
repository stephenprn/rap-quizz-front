import { Article } from './../../shared/classes/article.class';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  public article: Article;
  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesApiService: ArticlesApiService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  private getArticle() {
    this.loading = true;

    const url = this.route.snapshot.paramMap.get('url');

    this.articlesApiService.getArticleDetails(url).subscribe(
      (article: Article) => {
        this.article = article;
        this.loading = false;
      },
      (err: any) => {
        this.router.navigate(['/']);
      }
    );
  }
}
