import { AppConstants } from './../../app.constants';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsApiService } from 'src/app/shared/services/api/questions-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/shared/services/ui.service';
import { Router } from '@angular/router';
import {
  Response,
  ResponseType,
} from 'src/app/shared/classes/models/response.class';
import { ResponseApiService } from 'src/app/shared/services/api/response-api.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  public readonly QUIZ_DEFAULT_NBR_RESPONSES = 4;
  private readonly SEARCH_REFRESH_DELAY = 200;

  public addQuestionFormGroup: FormGroup;
  public responses: Response[] = [];
  public responseSelectedLabel: string;

  public searchTxt: string;
  public matchingResponses: Response[] = [];
  private matchingTimeout: any = null;

  public responseTypes: { value: string; label: string }[] = [
    { label: 'Artiste', value: ResponseType.ARTIST },
    { label: 'Album', value: ResponseType.ALBUM },
    { label: 'Autre', value: ResponseType.OTHER },
  ];

  public loading: boolean;
  public submitting: boolean;

  public ICONS = AppConstants.ICONS;
  public QUESTION_TITLE_MIN_LENGTH = AppConstants.QUESTION_TITLE_MIN_LENGTH;
  public QUESTION_TITLE_MAX_LENGTH = AppConstants.QUESTION_TITLE_MAX_LENGTH;

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private router: Router,

    private questionsApiService: QuestionsApiService,
    private responseApiService: ResponseApiService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.initAddQuestionForm();
  }

  private initAddQuestionForm() {
    this.addQuestionFormGroup = new FormGroup({
      label: new FormControl('', [
        Validators.required,
        Validators.minLength(this.QUESTION_TITLE_MIN_LENGTH),
        Validators.maxLength(this.QUESTION_TITLE_MAX_LENGTH),
      ]),
      responseType: new FormControl(ResponseType.ARTIST, [Validators.required]),
    });
  }

  public searchSuggestions(resetSelected?: boolean) {
    if (!!resetSelected) {
      this.responseSelectedLabel = null;
    }

    if (this.matchingTimeout !== null) {
      clearTimeout(this.matchingTimeout);
    }

    if (this.searchTxt == null || this.searchTxt === '') {
      this.matchingResponses = [];
      return;
    }

    this.matchingTimeout = setTimeout(() => {
      this.matchingTimeout = null;
      this.responseApiService
        .search(
          this.searchTxt,
          this.addQuestionFormGroup.get('responseType').value,
          this.responses
        )
        .subscribe(
          (responses: Response[]) => {
            this.matchingResponses = responses;
          },
          () => {
            this.uiService.displayToast(
              'Error while getting responses, please try again later'
            );
          }
        );
    }, this.SEARCH_REFRESH_DELAY);
  }

  public addNewResponse() {
    this.responseApiService
      .add(this.searchTxt, this.addQuestionFormGroup.get('responseType').value)
      .subscribe(
        (response: Response) => {
          this.addResponse(response);
        },
        () => {
          this.uiService.displayToast(
            'Error while adding response, please try again later'
          );
        }
      );
  }

  public addResponse(response: Response) {
    this.searchInput.nativeElement.value = '';
    this.responses.push(response);

    if (this.responses.length === 1) {
      this.selectResponse(response);
    }

    this.matchingResponses = [];
  }

  public removeResponse(response: Response) {
    this.responses = this.responses.filter((r) => r != response);

    if (this.responseSelectedLabel === response.label) {
      if (this.responses.length > 0) {
        this.selectResponse(this.responses[0]);
      } else {
        this.selectResponse(null);
      }
    }
  }

  public selectResponse(response?: Response) {
    this.responseSelectedLabel = response?.label || null;
  }

  public submit() {
    this.addQuestion();
  }

  private addQuestion() {
    this.submitting = true;
    const rightResponse = this.responses.find(
      (r) => r.label === this.responseSelectedLabel
    );
    const falseResponses = this.responses.filter((r) => r !== rightResponse);

    this.questionsApiService
      .add(
        this.addQuestionFormGroup.get('label').value,
        rightResponse,
        falseResponses
      )
      .subscribe(
        () => {
          this.uiService.displayToast('Question successfuly added!');
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
