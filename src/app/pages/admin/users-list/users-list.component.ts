import { UserRole } from './../../../shared/classes/models/user.class';
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
import { User } from 'src/app/shared/classes/models/user.class';
import { UserApiService } from 'src/app/shared/services/api/user-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  public pagination = new Pagination(0, 20);
  public users: User[] = [];

  public loading = new LoadingState();

  public ICONS = AppConstants.ICONS;
  public UserRole = UserRole;
  public Object = Object;

  constructor(
    private uiService: UiService,
    private userApiService: UserApiService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  public goPage(page: number) {
    this.pagination.pageNbr = page;
    this.getUsers();
  }

  public setUserRole(user: User, userRoleStr: string) {
    this.userApiService
      .editUser(user.uuid, {
        role: UserRole[userRoleStr]
      })
      .subscribe(
        () => {
          this.uiService.displayToast(`${user.username} is now ${userRoleStr}`);
        },
        (err: any) => {
          this.uiService.displayToast(err.error.message);
        }
      );
  }

  private getUsers() {
    this.loading.trigger();

    this.userApiService.list(this.pagination).subscribe({
      next: (res: PaginationResults<Response>) => {
        this.users = res.data;
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
}
