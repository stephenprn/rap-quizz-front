import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';

@Component({
  selector: 'app-quiz-infos',
  templateUrl: './quiz-infos.component.html',
  styleUrls: ['./quiz-infos.component.scss'],
})
export class QuizInfosComponent implements OnInit {
  @Input()
  public quiz: Quiz;

  @Input()
  public score: number;

  constructor() {}

  ngOnInit() {}
}
