import { QuestionsApiService } from './../../../shared/services/api/questions-api.service';
import { Question } from './../../../shared/classes/models/question.class';
import { Component, OnInit } from '@angular/core';
import {
  RestPagination,
  RestPaginationResults,
} from 'src/app/shared/services/rest.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { ProfileApiService } from 'src/app/shared/services/api/profile-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss'],
})
export class QuestionsListComponent implements OnInit {
  private questionsPagination = new RestPagination();
  public questions: { total: number; data: Question[] } = {
    total: null,
    data: [],
  };

  constructor(
    private uiService: UiService,
    private questionsApiService: QuestionsApiService
  ) {}

  ngOnInit() {
    this.initHistory();
  }

  private initHistory() {
    this.questionsApiService.list(this.questionsPagination).subscribe(
      (res: RestPaginationResults<Question>) => {
        this.questions.data.push(...res.data);
        this.questions.total = res.total;
        this.questionsPagination.pageNbr++;
      },
      (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description);
      }
    );
  }

  public setHidden(question: Question, hidden: boolean) {
    this.questionsApiService.setHidden(question, hidden).subscribe(
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
}
