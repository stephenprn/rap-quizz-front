import { QuestionsApiService } from './../../../shared/services/api/questions-api.service';
import {
  Question,
  QuestionSubType
} from './../../../shared/classes/models/question.class';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep from 'lodash/cloneDeep';
import {
  Pagination,
  PaginationResults
} from 'src/app/shared/classes/others/pagination.class';
import { AppConstants } from 'src/app/app.constants';
import {
  QuestionResponse,
  QuestionResponseStatus,
  ResponseType
} from 'src/app/shared/classes/models/response.class';
import { Router } from '@angular/router';
import { LoadingState } from 'src/app/shared/classes/others/loading-state.class';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  public pagination = new Pagination(0, 20);
  public questions: Question[] = [];
  public questionEdit: {
    label: string;
    question: Question;
  } = {
    label: null,
    question: null
  };

  public loading = new LoadingState();

  public ICONS = AppConstants.ICONS;
  public QUESTION_TITLE_MIN_LENGTH = AppConstants.QUESTION_TITLE_MIN_LENGTH;
  public QUESTION_TITLE_MAX_LENGTH = AppConstants.QUESTION_TITLE_MAX_LENGTH;

  public ResponseType = ResponseType;
  public QuestionSubType = QuestionSubType;
  public Object = Object;

  constructor(
    private router: Router,

    private uiService: UiService,
    private questionsApiService: QuestionsApiService
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  public goPage(page: number) {
    this.pagination.pageNbr = page;
    this.getQuestions();
  }

  private getQuestions() {
    this.loading.trigger();

    this.questionsApiService.list(this.pagination).subscribe({
      next: (res: PaginationResults<Question>) => {
        this.questions = res.data;
        this.questions.forEach((question: Question) => {
          const right = question.responses.filter(
            (response: QuestionResponse) =>
              response.status === QuestionResponseStatus.CORRECT
          );

          if (right.length > 0) {
            question.rightResponse = right[0].response;
          }
        });

        this.pagination.total = res.total;
        this.pagination.pageMax = Math.floor(
          res.total / this.pagination.nbrResults
        );
        this.pagination = cloneDeep(this.pagination);
        this.loading.stop();
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
        this.loading.stop();
      }
    });
  }

  public setType(question: Question, type: ResponseType) {
    this.questionsApiService
      .editQuestion(question.uuid, {
        responseType: type
      })
      .subscribe({
        next: () => {
          this.uiService.displayToast(
            `Question ${question.uuid} type updated ${type}`
          );
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      });
  }

  public setSubType(question: Question, subType: QuestionSubType) {
    this.questionsApiService
      .editQuestion(question.uuid, {
        subType
      })
      .subscribe({
        next: () => {
          this.uiService.displayToast(
            `Question ${question.uuid} type updated ${subType}`
          );
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      });
  }

  public setLabel() {
    this.questionsApiService
      .editQuestion(this.questionEdit.question.uuid, {
        label: this.questionEdit.label
      })
      .subscribe({
        next: () => {
          this.uiService.displayToast(
            `${this.questionEdit.question.label} -> ${this.questionEdit.label}`
          );
          this.questions.find(
            (q) => q.uuid === this.questionEdit.question.uuid
          ).label = this.questionEdit.label;

          this.questionEdit.label = null;
          this.questionEdit.question = null;
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      });
  }

  public setHidden(question: Question, hidden: boolean) {
    this.questionsApiService.editQuestion(question.uuid, { hidden }).subscribe({
      next: () => {
        this.uiService.displayToast(
          `Question ${question.uuid} cachée : ${hidden}`
        );
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
      }
    });
  }

  public setEditQuestion(question: Question) {
    this.questionEdit.label = question.label;
    this.questionEdit.question = question;
  }

  public goEdit(question: Question) {
    this.router.navigate([`/edit-question/${question.uuid}`]);
  }
}
