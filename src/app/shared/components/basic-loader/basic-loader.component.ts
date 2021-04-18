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
  selector: 'app-basic-loader',
  templateUrl: './basic-loader.component.html',
  styleUrls: ['./basic-loader.component.scss']
})
export class BasicLoaderComponent {
  public readonly DEFAULT_COLOR = '#ffffff';
  public readonly DEFAULT_BORDER_WIDTH = '8px';

  @Input()
  color: string;

  @Input()
  borderWidth: string;
}
