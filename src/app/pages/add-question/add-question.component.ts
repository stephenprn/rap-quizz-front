import { AppConstants } from './../../app.constants';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsApiService } from 'src/app/shared/services/api/questions-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/shared/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  QuestionResponse,
  QuestionResponseStatus,
  Response,
  ResponseType
} from 'src/app/shared/classes/models/response.class';
import { ResponseApiService } from 'src/app/shared/services/api/response-api.service';
import {
  Question,
  QuestionSubType
} from 'src/app/shared/classes/models/question.class';
import { ParagraphType } from 'src/app/shared/components/basic-paragraph/basic-paragraph.component';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  private readonly SEARCH_REFRESH_DELAY = 200;

  public readonly QUIZ_DEFAULT_NBR_RESPONSES_MAX = 4;
  public readonly QUIZ_DEFAULT_NBR_RESPONSES_MIN = 1;

  public readonly QUIZ_RANKING_NBR_RESPONSES_MIN = 3;
  public readonly QUIZ_RANKING_NBR_RESPONSES_MAX = 10;

  public addQuestionFormGroup: FormGroup;
  public responses: Response[] = [];
  public responseSelectedLabel: string;

  public searchTxt: string;
  public matchingResponses: Response[] = [];
  private matchingTimeout: any = null;

  public ResponseType = ResponseType;
  public responseTypes: { value: string; label: string }[] = [
    { label: 'Artiste', value: ResponseType.ARTIST },
    { label: 'Album', value: ResponseType.ALBUM },
    { label: 'Année', value: ResponseType.YEAR },
    { label: 'Titre', value: ResponseType.SONG },
    { label: 'Autre', value: ResponseType.OTHER }
  ];

  public questionUuid: string;
  public loading: boolean;
  public submitting: boolean;

  public ICONS = AppConstants.ICONS;
  public QUESTION_TITLE_MIN_LENGTH = AppConstants.QUESTION_TITLE_MIN_LENGTH;
  public QUESTION_TITLE_MAX_LENGTH = AppConstants.QUESTION_TITLE_MAX_LENGTH;

  public ParagraphType = ParagraphType;

  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

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
        Validators.maxLength(this.QUESTION_TITLE_MAX_LENGTH)
      ]),
      responseType: new FormControl(ResponseType.ARTIST, [Validators.required]),
      year: new FormControl('', [Validators.min(1900), Validators.max(2100)]),
      ranking: new FormControl(false)
    });

    const questionUuid = this.route.snapshot.paramMap.get('question_uuid');

    if (!questionUuid) {
      return;
    }

    this.questionUuid = questionUuid;

    this.questionsApiService.get(questionUuid).subscribe(
      (question: Question) => {
        this.addQuestionFormGroup.patchValue({
          label: question.label,
          responseType: ResponseType[question.type],
          year: question.response_precise,
          ranking: question.sub_type === QuestionSubType.RANKING
        });

        this.responses = question.responses.map(
          (qr: QuestionResponse) =>
            new Response({
              label: qr.response.label,
              type: qr.response.type,
              uuid: qr.response.uuid
            })
        );

        const right = question.responses.find(
          (r) => r.status === QuestionResponseStatus.CORRECT
        );

        if (right != null) {
          this.responseSelectedLabel = right.response.label;
        }
      },
      (err: any) => {
        console.log({ err });
        this.uiService.displayToast(err.error.description, true);
        this.router.navigate(['/']);
      }
    );
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
        .subscribe({
          next: (responses: Response[]) => {
            this.matchingResponses = responses;
          },
          error: () => {
            this.uiService.displayToast(
              'Une erreur est survenue, veuillez réessayer plus tard',
              true
            );
          }
        });
    }, this.SEARCH_REFRESH_DELAY);
  }

  public addNewResponse() {
    this.responseApiService
      .add(this.searchTxt, this.addQuestionFormGroup.get('responseType').value)
      .subscribe({
        next: (response: Response) => {
          this.addResponse(response);
        },
        error: () => {
          this.uiService.displayToast(
            'Error while adding response, please try again later',
            true
          );
        }
      });
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
    this.responses = this.responses.filter((r) => r !== response);

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

  public resetResponses() {
    this.responses = [];
    this.responseSelectedLabel = null;

    this.addQuestionFormGroup.patchValue({
      year: ''
    });
  }

  public formValid() {
    if (
      ResponseType.isPrecise(
        this.addQuestionFormGroup.get('responseType').value
      )
    ) {
      return (
        this.addQuestionFormGroup.valid &&
        this.addQuestionFormGroup.get('year').value
      );
    }

    if (!this.addQuestionFormGroup.valid) {
      return false;
    }

    if (this.addQuestionFormGroup.get('ranking').value) {
      return this.responses.length >= this.QUIZ_RANKING_NBR_RESPONSES_MIN;
    }

    return this.responses.length >= this.QUIZ_DEFAULT_NBR_RESPONSES_MIN;
  }

  public submit() {
    if (!this.questionUuid) {
      this.addQuestion();
    } else {
      this.updateQuestion();
    }
  }

  private addQuestion() {
    this.submitting = true;

    const {
      rightResponse,
      falseResponses,
      rankedResponses
    } = this.getResponses();

    this.questionsApiService
      .add(
        this.addQuestionFormGroup.get('label').value,
        this.addQuestionFormGroup.get('responseType').value,
        this.addQuestionFormGroup.get('ranking').value,
        rightResponse,
        falseResponses,
        rankedResponses,
        this.addQuestionFormGroup.get('year').value
      )
      .subscribe({
        next: () => {
          this.uiService.displayToast('Question proposée avec succès');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.uiService.displayToast(err.error, true);
        }
      });
  }

  private updateQuestion() {
    this.submitting = true;

    const {
      rightResponse,
      falseResponses,
      rankedResponses
    } = this.getResponses();

    this.questionsApiService
      .editQuestion(this.questionUuid, {
        label: this.addQuestionFormGroup.get('label').value,
        responseType: this.addQuestionFormGroup.get('responseType').value,
        ranking: this.addQuestionFormGroup.get('ranking').value,
        rightResponse,
        falseResponses,
        rankedResponses,
        year: this.addQuestionFormGroup.get('year').value
      })
      .subscribe({
        next: () => {
          this.uiService.displayToast('Question mise à jour avec succès');
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => {
          this.submitting = false;
          this.uiService.displayToast(err.error, true);
        }
      });
  }

  private getResponses(): {
    rightResponse: Response;
    falseResponses: Response[];
    rankedResponses: Response[];
  } {
    let rightResponse: Response;
    let falseResponses: Response[];
    let rankedResponses: Response[];

    if (
      !ResponseType.isPrecise(
        this.addQuestionFormGroup.get('responseType').value
      ) &&
      !this.addQuestionFormGroup.get('ranking').value
    ) {
      rightResponse = this.responses.find(
        (r) => r.label === this.responseSelectedLabel
      );
      falseResponses = this.responses.filter((r) => r !== rightResponse);
    } else if (this.addQuestionFormGroup.get('ranking').value) {
      rankedResponses = this.responses;
    }

    return { rightResponse, falseResponses, rankedResponses };
  }
}
