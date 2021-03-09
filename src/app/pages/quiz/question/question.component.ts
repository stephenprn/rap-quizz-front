import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/shared/classes/models/question.class';
import { Response } from 'src/app/shared/classes/models/response.class';
import { Player, PlayerAnswerStatus } from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;

  @Output()
  selectResponse = new EventEmitter<Response>();

  @Input()
  me: Player;

  constructor() {}

  ngOnInit() {}

  public answer(response: Response) {
    this.selectResponse.emit(response);
  }
}
