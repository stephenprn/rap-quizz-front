import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Player } from 'src/app/shared/classes/others/player.class';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-quiz-player-icon',
  templateUrl: './quiz-player-icon.component.html',
  styleUrls: ['./quiz-player-icon.component.scss']
})
export class QuizPlayerIconComponent implements OnChanges {
  public readonly DEFAULT_BORDER_WIDTH = '2px';
  public readonly DEFAULT_BORDER_COLOR = '#ffffff';
  public readonly DEFAULT_SIZE = '32px';
  public readonly DEFAULT_BACKGROUND_COLOR = '#000000';

  public readonly BRIGHT_TEXT_COLOR = '#ffffff';
  public readonly DARK_TEXT_COLOR = '#000000';

  public readonly FONT_SIZES = ['1.2rem', '0.9rem', '0.7rem', '0.5rem'];

  @Input()
  public player: Player;

  @Input()
  public size: string;

  @Input()
  public borderWidth: string;

  @Input()
  public borderColor: string;

  public initials: string;
  public darkText: boolean;
  public fontSize: string;

  constructor(private utilsService: UtilsService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.player && changes.player.currentValue != null) {
      this.initials = this.player.user.username
        .split(' ')
        .map((word: string) => word[0])
        .join();
      this.darkText = this.utilsService.isHexBright(this.player.color);
      this.fontSize = this.FONT_SIZES[this.initials.length]
        ? this.FONT_SIZES[this.initials.length]
        : this.FONT_SIZES[this.FONT_SIZES.length - 1];
    } else if (changes.player && changes.player.currentValue == null) {
      this.initials = null;
    }
  }
}
