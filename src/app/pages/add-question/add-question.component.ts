import { AppConstants } from './../../app.constants';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsApiService } from 'src/app/shared/services/api/questions-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'src/app/shared/services/ui.service';
import { Router } from '@angular/router';
import { Response, ResponseType } from 'src/app/shared/classes/models/response.class';
import { ResponseApiService } from 'src/app/shared/services/api/response-api.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss'],
})
export class AddQuestionComponent implements OnInit {
  public readonly TITLE_MIN_LENGTH = 8;
  public readonly TITLE_MAX_LENGTH = 100;
  private readonly SEARCH_REFRESH_DELAY = 200;

  public addQuestionFormGroup: FormGroup;

  public searchTxt: string;
  public matchingResponses: Response[] = [];
  private matchingTimeout: any = null;

  public responseTypes: { value: string, label: string }[] = [
    {label: "Artiste", value: ResponseType.ARTIST},
    {label: "Album", value: ResponseType.ALBUM},
    {label: "Date", value: ResponseType.DATE},
    {label: "Autre", value: ResponseType.OTHER}
  ];

  public loading: boolean;
  public submitting: boolean;

  public ICONS = AppConstants.ICONS;

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
        Validators.minLength(this.TITLE_MIN_LENGTH),
        Validators.maxLength(this.TITLE_MAX_LENGTH),
      ]),
      responseType: new FormControl(ResponseType.ARTIST, [Validators.required]),
      responseSelected: new FormControl(null, [Validators.required]),
    });
  }

  public searchSuggestions(resetSelected?: boolean) {
    if (!!resetSelected) {
      this.addQuestionFormGroup.controls['responseSelected'].setValue(null);
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
          this.addQuestionFormGroup.get('responseType').value
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
          this.selectResponse(response);
        },
        () => {
          this.uiService.displayToast(
            'Error while adding response, please try again later'
          );
        }
      );
  }

  public selectResponse(response: Response) {
    this.searchInput.nativeElement.value = '';
    this.addQuestionFormGroup.controls['responseSelected'].setValue(response);
    this.matchingResponses = [];
  }

  public submit() {
    this.addQuestion();
  }

  private addQuestion() {
    this.submitting = true;
    console.log(this.addQuestionFormGroup.value);

    this.questionsApiService
      .add(
        this.addQuestionFormGroup.get('label').value,
        this.addQuestionFormGroup.get('responseSelected').value
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
