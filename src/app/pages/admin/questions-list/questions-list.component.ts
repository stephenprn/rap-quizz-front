import { QuestionsApiService } from './../../../shared/services/api/questions-api.service';
import { Question } from './../../../shared/classes/models/question.class';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep from 'lodash/cloneDeep';
import { Pagination, PaginationResults } from 'src/app/shared/classes/others/pagination.class';
import { AppConstants } from 'src/app/app.constants';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  public questionsPagination = new Pagination(0, 20);
  public questions: Question[] = [];
  public questionEdit: {
    label: string,
    question: Question
  } = {
    label: null,
    question: null
  };

  public ICONS = AppConstants.ICONS;
  public QUESTION_TITLE_MIN_LENGTH = AppConstants.QUESTION_TITLE_MIN_LENGTH;
  public QUESTION_TITLE_MAX_LENGTH = AppConstants.QUESTION_TITLE_MAX_LENGTH;

  constructor(
    private uiService: UiService,
    private questionsApiService: QuestionsApiService
  ) {}

  ngOnInit() {
    this.getQuestions();
  }

  public goPage(page: number) {
    this.questionsPagination.pageNbr = page;
    this.getQuestions();
  }

  private getQuestions() {
    this.questionsApiService.list(this.questionsPagination).subscribe(
      (res: PaginationResults<Question>) => {
        this.questions = res.data;
        this.questionsPagination.total = res.total;
        this.questionsPagination.pageMax =
          Math.floor(res.total / this.questionsPagination.nbrResults);
        this.questionsPagination = cloneDeep(this.questionsPagination );
      },
      (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description);
      }
    );
  }

  public setLabel() {
    this.questionsApiService.editQuestion(this.questionEdit.question, {
      label: this.questionEdit.label
    }).subscribe(
      () => {
        this.uiService.displayToast(
          `${this.questionEdit.question.label} -> ${this.questionEdit.label}`
        );
        this.questions.find(q => q.uuid === this.questionEdit.question.uuid).label = this.questionEdit.label;
        
        this.questionEdit.label = null;
        this.questionEdit.question = null;
      },
      (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description);
      }
    );
  }

  public setHidden(question: Question, hidden: boolean) {
    this.questionsApiService.editQuestion(question, { hidden }).subscribe(
      () => {
        this.uiService.displayToast(
          `Question ${question.uuid} cachée : ${hidden}`
        );
      },
      (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description);
      }
    );
  }

  public setEditQuestion(question: Question) {
    this.questionEdit.label = question.label;
    this.questionEdit.question = question;
  }
}
