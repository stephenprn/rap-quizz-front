import { UiService } from 'src/app/shared/services/ui.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { CommentsApiService } from 'src/app/shared/services/api/comments-api.service';
import {
  RestPagination,
  RestPaginationResults,
} from 'src/app/shared/services/rest.service';
import { ArticleComment } from 'src/app/shared/classes/article-comment.class';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginDialogComponent } from 'src/app/shared/dialogs/login/login-dialog.component';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss'],
})
export class ArticleCommentsComponent implements OnInit {
  public readonly BODY_MIN_LENGTH = 6;
  public readonly BODY_MAX_LENGTH = 600;

  @Input()
  articleUrl: string;

  public commentFormGroup: FormGroup;

  private pagination: RestPagination = new RestPagination(null, 20);

  public comments: ArticleComment[];
  public totalComments: number;

  public loading: boolean; // indicator for general loading
  public loadingMore: boolean; // indicator for loading more results
  private noMore: boolean;

  public sendingComment: boolean;

  constructor(
    private commentsApiService: CommentsApiService,
    private authenticationService: AuthenticationService,
    private uiService: UiService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getComments(true);
    this.initCommentForm();
  }

  private initCommentForm() {
    this.commentFormGroup = new FormGroup({
      body: new FormControl('', [
        Validators.required,
        Validators.minLength(this.BODY_MIN_LENGTH),
        Validators.maxLength(this.BODY_MAX_LENGTH),
      ]),
    });
  }

  private getComments(reset?: boolean) {
    if (reset) {
      this.comments = [];

      this.loading = true;
      this.loadingMore = false;
      this.noMore = false;
    } else if (this.noMore || this.loading || this.loadingMore) {
      return;
    } else {
      this.loadingMore = true;
    }

    this.commentsApiService
      .getComments(this.articleUrl, this.pagination)
      .subscribe((res: RestPaginationResults<ArticleComment>) => {
        this.comments.push(...res.data);
        this.changeDetector.detectChanges();

        if (reset) {
          this.totalComments = res.total;
        }

        this.loading = false;
        this.loadingMore = false;
        this.pagination.pageNbr++;

        if (res.data.length < this.pagination.nbrResults) {
          this.noMore = true;
        }
      });
  }

  public sendCommentClicked() {
    if (!this.authenticationService.userConnected$.value) {
      this.uiService.displayToast('You have to log in to leave a comment');

      this.uiService.displayDialog(LoginDialogComponent, {
        width: '600px',
        height: '400px',
      });

      return;
    }

    this.sendingComment = true;

    this.commentsApiService
      .commentArticle(this.articleUrl, this.commentFormGroup.get('body').value)
      .subscribe(
        () => {
          this.uiService.displayToast('Your comment has been published!');
          this.getComments(true);
          this.commentFormGroup.reset();
        },
        (err: any) => {
          console.log(err);
          this.uiService.displayToast(err.error, true);
        },
        () => {
          this.sendingComment = false;
        }
      );
  }

  public trackByFn(index: number, comment: ArticleComment) {
    return comment.uuid;
  }
}
