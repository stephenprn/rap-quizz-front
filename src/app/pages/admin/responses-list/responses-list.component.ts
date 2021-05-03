import { Response } from '../../../shared/classes/models/response.class';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep from 'lodash/cloneDeep';
import {
  Pagination,
  PaginationResults
} from 'src/app/shared/classes/others/pagination.class';
import { AppConstants } from 'src/app/app.constants';
import { Router } from '@angular/router';
import { LoadingState } from 'src/app/shared/classes/others/loading-state.class';
import { ResponseApiService } from 'src/app/shared/services/api/response-api.service';

@Component({
  selector: 'app-responses-list',
  templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})
export class ResponsesListComponent implements OnInit {
  public pagination = new Pagination(0, 20);
  public responses: Response[] = [];
  public responseEdit: {
    label: string;
    response: Response;
  } = {
    label: null,
    response: null
  };

  public loading = new LoadingState();

  public ICONS = AppConstants.ICONS;

  constructor(
    private router: Router,

    private uiService: UiService,
    private responsesApiService: ResponseApiService
  ) {}

  ngOnInit() {
    this.getResponses();
  }

  public goPage(page: number) {
    this.pagination.pageNbr = page;
    this.getResponses();
  }

  private getResponses() {
    this.loading.trigger();

    this.responsesApiService.list(this.pagination).subscribe({
      next: (res: PaginationResults<Response>) => {
        this.responses = res.data;
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

  public setLabel() {
    this.responsesApiService
      .editResponse(this.responseEdit.response.uuid, {
        label: this.responseEdit.label
      })
      .subscribe({
        next: () => {
          this.uiService.displayToast(
            `${this.responseEdit.response.label} -> ${this.responseEdit.label}`
          );
          this.responses.find(
            (q) => q.uuid === this.responseEdit.response.uuid
          ).label = this.responseEdit.label;

          this.responseEdit.label = null;
          this.responseEdit.response = null;
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
        }
      });
  }

  public setHidden(response: Response, hidden: boolean) {
    this.responsesApiService.editResponse(response.uuid, { hidden }).subscribe({
      next: () => {
        this.uiService.displayToast(
          `Response ${response.uuid} cachée : ${hidden}`
        );
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
      }
    });
  }

  public setEditResponse(response: Response) {
    this.responseEdit.label = response.label;
    this.responseEdit.response = response;
  }

  public goEdit(response: Response) {
    this.router.navigate([`/edit-response/${response.uuid}`]);
  }
}
