import { UiService } from 'src/app/shared/services/ui.service';
import { Article } from '../../shared/classes/article.class';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss'],
})
export class ArticleDetailsComponent implements OnInit {
  public article: Article;
  public articleUrl: string;

  public loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,

    private uiService: UiService,
    private articlesApiService: ArticlesApiService
  ) {}

  ngOnInit(): void {
    this.getArticle();
  }

  private getArticle() {
    this.loading = true;

    this.articleUrl = this.route.snapshot.paramMap.get('url');

    this.articlesApiService.getArticleDetails(this.articleUrl ).subscribe(
      (article: Article) => {
        this.article = article;
        this.titleService.setTitle(article.title);
        this.loading = false;
      },
      (err: any) => {
        this.uiService.displayToast('Article not found', true);
        this.router.navigate(['/']);
      }
    );
  }
}
