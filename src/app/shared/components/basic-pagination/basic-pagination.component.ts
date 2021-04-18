import { AppConstants } from './../../../app.constants';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { Pagination } from '../../classes/others/pagination.class';

@Component({
  selector: 'app-basic-pagination',
  templateUrl: './basic-pagination.component.html',
  styleUrls: ['./basic-pagination.component.scss']
})
export class BasicPaginationComponent implements OnChanges {
  @Output()
  goPage = new EventEmitter<number>();

  @Input()
  pagination: Pagination;

  public pages: number[][];

  public ICONS = AppConstants.ICONS;

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.pagination &&
      changes.pagination.currentValue != null &&
      changes.pagination.currentValue.pageMax != null
    ) {
      if (this.pagination.pageMax <= 6) {
        this.pages = [
          Array(this.pagination.pageMax + 1)
            .fill(null)
            .map((x, i) => i + 1)
        ];
      } else {
        this.pages = [
          [1, 2, 3],
          [
            this.pagination.pageMax - 1,
            this.pagination.pageMax,
            this.pagination.pageMax + 1
          ]
        ];
      }
    }
  }
}
