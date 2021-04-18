import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from 'src/app/shared/classes/others/player.class';

@Component({
  selector: 'app-quiz-starting',
  templateUrl: './quiz-starting.component.html',
  styleUrls: ['./quiz-starting.component.scss']
})
export class QuizStartingComponent implements OnInit {
  constructor() {}
  @Input()
  public players: Player[];

  @Output()
  private countdownFinished = new EventEmitter();

  private readonly COUNTDOWN_SEC = 3;
  private readonly FLAMES_TOTAL = 3;
  private readonly FLAME_INYTERVAL_MS = 200;

  public countdownCurrentSec = this.COUNTDOWN_SEC;
  public flames: string[];
  public flameCurrentIndex = 0;
  private readonly FLAMES_ROOT_SRC = (i: number) =>
    `assets/img/flames/flame${i}.svg`;

  ngOnInit() {
    this.initCountdown();
    this.initFlames();
  }

  private initFlames() {
    this.flames = new Array(this.FLAMES_TOTAL + 1)
      .fill(null)
      .map((value: any, i: number) => this.FLAMES_ROOT_SRC(i));
    console.log(this.flames);

    setInterval(() => {
      if (this.flameCurrentIndex === this.FLAMES_TOTAL) {
        this.flameCurrentIndex = 0;
      } else {
        this.flameCurrentIndex++;
      }
    }, this.FLAME_INYTERVAL_MS);
  }

  private initCountdown() {
    setInterval(() => {
      if (this.countdownCurrentSec === 1) {
        this.countdownFinished.emit();
        return;
      }

      this.countdownCurrentSec -= 1;
    }, 1000);
  }
}
