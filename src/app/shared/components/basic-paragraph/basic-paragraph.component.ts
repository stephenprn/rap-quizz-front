import { Component, Input } from '@angular/core';
import { AppConstants } from 'src/app/app.constants';

export enum ParagraphType {
  INFO = 'INFO',
  WARNING = 'WARNING'
}

@Component({
  selector: 'app-basic-paragraph',
  templateUrl: './basic-paragraph.component.html',
  styleUrls: ['./basic-paragraph.component.scss']
})
export class BasicParagraphComponent {
  @Input()
  public type: ParagraphType;

  public readonly PARAGRAPH_TYPE_ICONS_MAP = {
    [ParagraphType.INFO]: { icon: AppConstants.ICONS.info, color: '#ffffff' },
    [ParagraphType.WARNING]: {
      icon: AppConstants.ICONS.warning,
      color: '#ffc300'
    }
  };
}
