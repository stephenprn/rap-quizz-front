import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-ending-medal',
  templateUrl: './quiz-ending-medal.component.html',
  styleUrls: ['./quiz-ending-medal.component.scss']
})
export class QuizEndingMedalComponent {
  @Input()
  public rank: number;

  public readonly RANK_COLORS = ['#daa520', '#b4b4b4', '#ad8a56'];
  public readonly RANK_DEFAULT_COLOR = '#838383';
}
