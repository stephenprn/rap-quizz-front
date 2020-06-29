import { Article } from 'src/app/shared/classes/article.class';
import { UiService } from 'src/app/shared/services/ui.service';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  RestPagination,
  RestPaginationResults,
} from 'src/app/shared/services/rest.service';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly SCROLL_DISTANCE_FROM_BOTTOM_REFRESH = 100;
  private pagination: RestPagination = new RestPagination(null, 20);

  public articles: Article[];
  public totalArticles: number;

  public loading: boolean; // indicator for general loading
  public loadingMore: boolean; // indicator for loading more results
  private noMore: boolean;

  private promises = {
    windowScroll: null,
  };

  constructor(
    private uiService: UiService,
    private utilsService: UtilsService,
    private articlesApiService: ArticlesApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getArticles(true);
    this.initPromises();
  }

  ngOnDestroy(): void {
    this.utilsService.unsubscribeAll(this.promises);
  }

  private initPromises() {
    this.promises.windowScroll = this.uiService.windowScroll$.subscribe(
      (distanceFromBottom: number) => {
        if (distanceFromBottom <= this.SCROLL_DISTANCE_FROM_BOTTOM_REFRESH) {
          this.getArticles();
        }
      }
    );
  }

  public getArticles(reset?: boolean) {
    if (reset) {
      this.articles = [];

      this.loading = true;
      this.loadingMore = false;
      this.noMore = false;
    } else if (this.noMore || this.loading || this.loadingMore) {
      return;
    } else {
      this.loadingMore = true;
    }

    this.articlesApiService
      .getArticlesList(this.pagination)
      .subscribe((res: RestPaginationResults<Article>) => {
        this.articles.push(...res.data);
        this.changeDetector.detectChanges();

        if (reset) {
          this.totalArticles = res.total;
        }

        this.loading = false;
        this.loadingMore = false;
        this.pagination.pageNbr++;

        if (res.data.length < this.pagination.nbrResults) {
          this.noMore = true;
        }
      });
  }

  public openArticle(url: string) {
    this.router.navigate(['/article-details', url]);
  }

  public trackByFn(index: number, article: Article) {
    return article.url;
  }
}
