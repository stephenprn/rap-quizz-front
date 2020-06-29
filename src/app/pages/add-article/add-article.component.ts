import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/shared/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/shared/classes/article.class';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  public readonly TITLE_MIN_LENGTH = 8;
  public readonly TITLE_MAX_LENGTH = 100;

  public addArticleFormGroup: FormGroup;
  public url: string;

  public loading: boolean;
  public submitting: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private articlesApiService: ArticlesApiService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initAddArticleForm();
    this.initUpdateArticle();
  }

  private initAddArticleForm() {
    this.addArticleFormGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(this.TITLE_MIN_LENGTH),
        Validators.maxLength(this.TITLE_MAX_LENGTH),
      ]),
      body: new FormControl('', [Validators.required]),
    });
  }

  private initUpdateArticle() {
    this.url = this.route.snapshot.paramMap.get('url');

    if (this.url == null) {
      return;
    }

    this.loading = true;

    this.articlesApiService
      .getMyArticleDetails(this.url)
      .subscribe((article: Article) => {
        this.addArticleFormGroup.get('title').patchValue(article.title);
        this.addArticleFormGroup.get('body').patchValue(article.body);
      });
  }

  public submit() {
    if (this.url == null) {
      this.addArticle();
    } else {
      this.updateArticle();
    }
  }

  private addArticle() {
    this.submitting = true;

    this.articlesApiService
      .addArticle(
        this.addArticleFormGroup.get('title').value,
        this.addArticleFormGroup.get('body').value
      )
      .subscribe(
        () => {
          this.uiService.displayToast('Article successfuly added!');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error, true);
        },
        () => {
          this.submitting = false;
        }
      );
  }

  private updateArticle() {
    this.submitting = true;

    this.articlesApiService
      .updateArticle(
        this.addArticleFormGroup.get('title').value,
        this.addArticleFormGroup.get('body').value,
        this.url
      )
      .subscribe(
        () => {
          this.uiService.displayToast('Article successfuly updated!');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error, true);
        },
        () => {
          this.submitting = false;
        }
      );
  }
}
