import { PlayerAnswerStatus } from 'src/app/shared/classes/others/player.class';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Response } from 'src/app/shared/classes/models/response.class';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.scss'],
})
export class ResponseComponent implements OnChanges {
  @Input()
  public response: Response;

  @Output()
  public selectResponse = new EventEmitter<void>();

  @Input()
  public answerStatus: PlayerAnswerStatus;

  public PlayerAnswerStatus = PlayerAnswerStatus;
  public customClass: 'right' | 'wrong' | null;
  private selected: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.answerStatus && changes.answerStatus.currentValue) {
      this.getCustomClass();
    }
  }

  public answer() {
    this.selected = true;
    this.selectResponse.emit();
  }

  public getCustomClass() {
    if (this.selected && this.answerStatus === PlayerAnswerStatus.WRONG) {
      this.customClass = 'wrong';
    } else if (
      this.selected &&
      this.answerStatus === PlayerAnswerStatus.RIGHT
    ) {
      this.customClass = 'right';
    } else {
      this.customClass = null;
    }

    console.log(this.customClass);
  }
}
