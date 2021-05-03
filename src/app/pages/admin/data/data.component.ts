import { FormControl, FormGroup, Validators } from '@angular/forms';
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
import { AdminApiService } from 'src/app/shared/services/api/admin-api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public loadingCrawl: boolean;
  public crawlFormGroup: FormGroup;

  public ICONS = AppConstants.ICONS;

  constructor(
    private uiService: UiService,
    private adminApiService: AdminApiService
  ) {}

  ngOnInit() {
    this.initCrawlFormGroup();
  }

  private initCrawlFormGroup() {
    this.crawlFormGroup = new FormGroup({
      artistGeniusId: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  public crawlArtist() {
    this.loadingCrawl = true;

    this.adminApiService
      .crawlArtist(this.crawlFormGroup.get('artistGeniusId').value)
      .subscribe({
        next: () => {
          this.uiService.displayToast('Crawl succeed');
          this.loadingCrawl = false;
        },
        error: (err: HttpErrorResponse) => {
          this.uiService.displayToast(err.error.description, true);
          this.loadingCrawl = false;
        }
      });
  }
}
