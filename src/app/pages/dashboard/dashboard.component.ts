import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserQuiz } from 'src/app/shared/classes/models/quiz.class';
import { ProfileApiService } from 'src/app/shared/services/api/profile-api.service';
import { UiService } from 'src/app/shared/services/ui.service';
import cloneDeep from 'lodash/cloneDeep';
import {
  Pagination,
  PaginationResults
} from 'src/app/shared/classes/others/pagination.class';
import { LoadingState } from 'src/app/shared/classes/others/loading-state.class';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public historyPagination = new Pagination(0, 20);
  public history: UserQuiz[] = [];

  public loading = new LoadingState();

  constructor(
    private uiService: UiService,
    private profileApiService: ProfileApiService
  ) {}

  ngOnInit() {
    this.getHistory();
  }

  public goPage(page: number) {
    this.historyPagination.pageNbr = page;
    this.getHistory();
  }

  private getHistory() {
    this.profileApiService.getHistory(this.historyPagination).subscribe({
      next: (res: PaginationResults<UserQuiz>) => {
        this.history = res.data;
        this.historyPagination.total = res.total;
        this.historyPagination.pageMax = Math.floor(
          res.total / this.historyPagination.nbrResults
        );
        this.historyPagination = cloneDeep(this.historyPagination);
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
      }
    });
  }
}
