import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserQuiz } from 'src/app/shared/classes/models/quiz.class';
import { ProfileApiService } from 'src/app/shared/services/api/profile-api.service';
import { RestPagination, RestPaginationResults } from 'src/app/shared/services/rest.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private historyPagination = new RestPagination();
  public history: { total: number, data: UserQuiz[] } = { total: null, data: [] };

  constructor(
    private uiService: UiService,
    private profileApiService: ProfileApiService
  ) {}

  ngOnInit() {
    this.initHistory();
  }

  private initHistory() {
    this.profileApiService.getHistory(this.historyPagination).subscribe(
      (res: RestPaginationResults<UserQuiz>) => {
        this.history.data.push(...res.data);
        this.history.total = res.total;
        this.historyPagination.pageNbr++;
      },
      (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description);
      }
    );
  }
}
