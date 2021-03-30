import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-basic-button',
  templateUrl: './basic-button.component.html',
  styleUrls: ['./basic-button.component.scss'],
})
export class BasicButtonComponent {
  @Output()
  clicked = new EventEmitter();

  @Input()
  tooltip: string;

  @Input()
  disabled: boolean;

  @Input()
  icon: string;

  @Input()
  full: boolean;

  @Input()
  customClass: string;

  public buttonClicked() {
    if (this.disabled) {
      return;
    }
    
    this.clicked.emit();
  }
}
