import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Player } from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-quiz-starting',
  templateUrl: './quiz-starting.component.html',
  styleUrls: ['./quiz-starting.component.scss'],
})
export class QuizStartingComponent implements OnInit {
  @Input()
  public players: Player[];

  constructor(
  ) {}

  ngOnInit() {}
}
