import { AppConstants } from './../../../app.constants';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { Pagination } from '../../classes/others/pagination.class';

@Component({
  selector: 'app-basic-loader',
  templateUrl: './basic-loader.component.html',
  styleUrls: ['./basic-loader.component.scss']
})
export class BasicLoaderComponent implements OnInit {
  public readonly DEFAULT_COLOR = '#df965f';
  public readonly DEFAULT_BORDER_WIDTH = '8px';

  public readonly DEFAULT_SIZE = '64px';

  public colorBackground: string;

  ngOnInit() {
    this.colorBackground =
      (this.color ? this.color : this.DEFAULT_COLOR) + '15';
  }

  @Input()
  color: string;

  @Input()
  borderWidth: string;

  @Input()
  size: string;
}
