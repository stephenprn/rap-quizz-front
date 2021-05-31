import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/shared/services/ui.service';
import { HttpErrorResponse } from '@angular/common/http';
import cloneDeep from 'lodash/cloneDeep';
import {
  Pagination,
  PaginationResults
} from 'src/app/shared/classes/others/pagination.class';
import { AppConstants } from 'src/app/app.constants';
import { LoadingState } from 'src/app/shared/classes/others/loading-state.class';
import { AdminApiService } from 'src/app/shared/services/api/admin-api.service';
import { ArtistApiService } from 'src/app/shared/services/api/artist-api.service';
import { Artist } from 'src/app/shared/classes/models/artist.class';
import { ResponseApiService } from 'src/app/shared/services/api/response-api.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  public loadingCrawl: boolean;
  public crawlFormGroup: FormGroup;

  public artistPagination = new Pagination(0, 20);
  public artistLoading = new LoadingState();
  public artists: Artist[] = [];

  public generateQuestionsLoading = false;

  public ICONS = AppConstants.ICONS;

  constructor(
    private uiService: UiService,

    private adminApiService: AdminApiService,
    private artistApiService: ArtistApiService,
    private responsesApiService: ResponseApiService
  ) {}

  ngOnInit() {
    this.initCrawlFormGroup();
    this.getArtists();
  }

  private initCrawlFormGroup() {
    this.crawlFormGroup = new FormGroup({
      artistGeniusId: new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  public goPage(page: number) {
    this.artistPagination.pageNbr = page;
    this.getArtists();
  }

  public setHidden(artist: Artist, hidden: boolean) {
    this.responsesApiService.editResponse(artist.uuid, { hidden }).subscribe({
      next: () => {
        this.uiService.displayToast(
          `Response ${artist.uuid} cachée : ${hidden}`
        );
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
      }
    });
  }

  public generateQuestions(artist: Artist) {
    if (this.generateQuestionsLoading) {
      return;
    }

    this.generateQuestionsLoading = true;

    this.artistApiService.generateQuestions(artist.uuid).subscribe({
      next: (res: { nbr_generated: number }) => {
        this.generateQuestionsLoading = false;
        this.uiService.displayToast(
          `Generation succeed: ${res.nbr_generated} questions added`
        );
      },
      error: (err: HttpErrorResponse) => {
        this.generateQuestionsLoading = false;
        this.uiService.displayToast(
          'Error while generating questions: ' + err.error.description,
          true
        );
      }
    });
  }

  private getArtists() {
    this.artistLoading.trigger();

    this.artistApiService.list(this.artistPagination).subscribe({
      next: (res: PaginationResults<Artist>) => {
        this.artists = res.data;
        this.artistPagination.total = res.total;
        this.artistPagination.pageMax = Math.floor(
          res.total / this.artistPagination.nbrResults
        );
        this.artistPagination = cloneDeep(this.artistPagination);
        this.artistLoading.stop();
      },
      error: (err: HttpErrorResponse) => {
        this.uiService.displayToast(err.error.description, true);
        this.artistLoading.stop();
      }
    });
  }
  public crawlArtist() {
    this.loadingCrawl = true;

    let ids: number[];

    try {
      ids = this.crawlFormGroup
        .get('artistGeniusId')
        .value.split(',')
        .map((idStr: string) => Number(idStr));
    } catch (e) {
      this.uiService.displayToast('Format invalide', true);
      return;
    }

    this.adminApiService.crawlArtists(ids).subscribe({
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
