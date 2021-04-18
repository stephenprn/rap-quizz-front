import { Player } from './../../../shared/classes/others/player.class';
import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';

@Component({
  selector: 'app-quiz-ending-summary',
  templateUrl: './quiz-ending-summary.component.html',
  styleUrls: ['./quiz-ending-summary.component.scss']
})
export class QuizEndingSummaryComponent implements OnInit {
  @Input()
  public quiz: Quiz;

  @Input()
  public score: number;

  @Input()
  public players: Player[];

  @Input()
  public me: Player;

  constructor() {}

  ngOnInit() {}
}
