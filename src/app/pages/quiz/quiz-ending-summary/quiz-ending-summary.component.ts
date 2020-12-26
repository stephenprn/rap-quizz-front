import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';

@Component({
  selector: 'app-quiz-ending-summary',
  templateUrl: './quiz-ending-summary.component.html',
  styleUrls: ['./quiz-ending-summary.component.scss'],
})
export class QuizEndingSummaryComponent implements OnInit {
  @Input()
  public quiz: Quiz;

  @Input()
  public score: number;

  constructor() {}

  ngOnInit() {}
}
