import { AppConstants } from './../../../app.constants';
import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';
import {
  Player,
  PlayerAnswerStatus
} from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-quiz-infos',
  templateUrl: './quiz-infos.component.html',
  styleUrls: ['./quiz-infos.component.scss']
})
export class QuizInfosComponent implements OnInit {
  public readonly RIGHT_COLOR = '#42b442';
  public readonly WRONG_COLOR = '#bd4b4b';

  @Input()
  public quiz: Quiz;

  @Input()
  public currentIndex: number;

  @Input()
  public players: Player[];

  @Input()
  public me: Player;

  public PlayerAnswerStatus = PlayerAnswerStatus;
  public ICONS = AppConstants.ICONS;

  constructor() {}

  ngOnInit() {}
}
