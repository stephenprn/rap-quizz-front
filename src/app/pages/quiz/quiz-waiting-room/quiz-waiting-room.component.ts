import { AppConstants } from './../../../app.constants';
import { UtilsService } from './../../../shared/services/utils.service';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Player } from 'src/app/shared/classes/others/player.class';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-quiz-waiting-room',
  templateUrl: './quiz-waiting-room.component.html',
  styleUrls: ['./quiz-waiting-room.component.scss'],
})
export class QuizWaitingRoomComponent {
  @Output()
  public startQuiz = new EventEmitter();

  @Input()
  public players: Player[];

  @Input()
  public quiz: Quiz;

  @Input()
  public admin: boolean;

  public ICONS = AppConstants.ICONS;

  constructor(
    private utilsService: UtilsService,
    private uiService: UiService
  ) {}

  public shareLink() {
    this.utilsService.copyToClipboard(this.utilsService.getCurrentUrl(true));
    this.uiService.displayToast('Lien copié !');
  }
}
