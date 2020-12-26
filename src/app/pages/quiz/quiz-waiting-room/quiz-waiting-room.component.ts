import { UtilsService } from './../../../shared/services/utils.service';
import { QuizSocketService } from 'src/app/shared/services/quiz-socket.service';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  OnDestroy,
  Input,
} from '@angular/core';
import { User } from 'src/app/shared/classes/models/user.class';
import { Player } from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-quiz-waiting-room',
  templateUrl: './quiz-waiting-room.component.html',
  styleUrls: ['./quiz-waiting-room.component.scss'],
})
export class QuizWaitingRoomComponent implements OnInit {
  @Output()
  public startQuiz = new EventEmitter();

  @Input()
  public players: Player[];

  constructor(
  ) {}

  ngOnInit() {}
}
