import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesApiService } from 'src/app/shared/services/api/articles-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/shared/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss'],
})
export class AddArticleComponent implements OnInit {
  public readonly TITLE_MIN_LENGTH = 8;
  public readonly TITLE_MAX_LENGTH = 100;

  public addArticleFormGroup: FormGroup;

  constructor(
    private router: Router,
    private articlesApiService: ArticlesApiService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initAddArticleForm();
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

  public addArticle() {
    this.articlesApiService
      .addArticle(
        this.addArticleFormGroup.get('title').value,
        this.addArticleFormGroup.get('body').value
      )
      .subscribe(
        (res: any) => {
          this.uiService.displayToast('Article successfuly added!');
          this.router.navigate(['/']);
        },
        (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error, true);
        }
      );
  }
}
