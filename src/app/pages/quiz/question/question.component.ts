import { AppConstants } from './../../../app.constants';
import { QuizConstants } from './../quiz.contants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/shared/classes/models/question.class';
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
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;

  @Output()
  selectResponse = new EventEmitter<Response>();

  @Output()
  responsePrecise = new EventEmitter<string>();

  @Input()
  me: Player;

  public RESPONSE_TYPES_PRECISE = QuizConstants.RESPONSE_TYPES_PRECISE;
  public ICONS = AppConstants.ICONS;
  public PlayerAnswerStatus = PlayerAnswerStatus;

  public preciseFormGroup: FormGroup;

  ngOnInit() {
    this.initPreciseForm();
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

  public answer(response: Response) {
    this.selectResponse.emit(response);
  }

  public answerPrecise() {
    this.responsePrecise.emit(this.preciseFormGroup.get('year').value);
  }
}
