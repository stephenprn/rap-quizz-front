import { UiService } from './../../shared/services/ui.service';
import { Router } from '@angular/router';
import { Article } from './../../shared/classes/article.class';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  RestPagination,
  RestPaginationResults,
} from 'src/app/shared/services/rest.service';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { ConfirmationDialogComponent } from 'src/app/shared/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
    private articlesApiService: ArticlesApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,

    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.getMyArticles(true);
    this.initPromises();
  }

  private initPromises() {
    this.promises.windowScroll = this.uiService.windowScroll$.subscribe(
      (distanceFromBottom: number) => {
        if (distanceFromBottom <= this.SCROLL_DISTANCE_FROM_BOTTOM_REFRESH) {
          this.getMyArticles();
        }
      }
    );
  }

  public getMyArticles(reset?: boolean) {
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
      .getMyArticlesList(this.pagination)
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

  public openEditArticle(url: string) {
    this.router.navigate(['/article-details', url]);
  }

  public openDeleteConfirmation(article: Article, index: number) {
    const dialog = this.uiService.displayDialog(
      ConfirmationDialogComponent,
      {
        width: '40vw',
        height: '25vh',
      },
      {
        texts: {
          main: 'Are you sure you want to delete this article?',
        },
        warning: true,
      }
    );

    dialog.afterClosed().subscribe((state: boolean) => {
      if (state) {
        this.articlesApiService.deleteArticle(article.url).subscribe(
          () => {
            this.uiService.displayToast('Article delete successfuly');
            this.articles.splice(index, 1);
          },
          (err: any) => {
            this.uiService.displayToast(err.error, true);
          }
        );
      }
    });
  }

  public openArticle(url: string) {
    this.router.navigate(['/article-details', url]);
  }

  public goEditArticle(article: Article) {
    this.router.navigate(['/edit-article', article.url]);
  }

  public trackByFn(index: number, article: Article) {
    return article.url;
  }
}
