import { ResponseType } from './../../../shared/classes/models/response.class';
import { AppConstants } from './../../../app.constants';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Question,
  QuestionSubType
} from 'src/app/shared/classes/models/question.class';
import { Response } from 'src/app/shared/classes/models/response.class';
import {
  Player,
  PlayerAnswerStatus
} from 'src/app/shared/classes/others/player.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnChanges {
  @Input()
  question: Question;

  @Output()
  selectResponse = new EventEmitter<Response>();

  @Output()
  responsePrecise = new EventEmitter<string>();

  @Output()
  responseRanked = new EventEmitter<Response[]>();

  @Input()
  me: Player;

  public ICONS = AppConstants.ICONS;
  public PlayerAnswerStatus = PlayerAnswerStatus;
  public QuestionSubType = QuestionSubType;
  public ResponseType = ResponseType;

  public preciseFormGroup: FormGroup;
  public rankedResponses: Response[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue) {
      this.initPreciseForm();
      this.initRankedResponses();
    }
  }

  private initPreciseForm() {
    this.preciseFormGroup = new FormGroup({
      year: new FormControl('', [
        Validators.required,
        Validators.min(1900),
        Validators.max(2100)
      ])
    });
  }

  private initRankedResponses() {
    if (!(this.question.sub_type === QuestionSubType.RANKING)) {
      return;
    }

    this.rankedResponses = this.question.responses.map((qr) => qr.response);
  }

  public answer(response: Response) {
    this.selectResponse.emit(response);
  }

  public answerRanking() {
    this.responseRanked.emit(this.rankedResponses);
  }

  public answerPrecise() {
    this.responsePrecise.emit(this.preciseFormGroup.get('year').value);
  }
}
