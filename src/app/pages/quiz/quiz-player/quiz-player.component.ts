import { AppConstants } from '../../../app.constants';

import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-quiz-player',
  templateUrl: './quiz-player.component.html',
  styleUrls: ['./quiz-player.component.scss'],
})
export class QuizPlayerComponent {
  @Input()
  public player: Player;

  @Input()
  public withRank: boolean;

  @Input()
  public withScore: boolean;

  @Input()
  public withDate: boolean;

  public ICONS = AppConstants.ICONS;
}
