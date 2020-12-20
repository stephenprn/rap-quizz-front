import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from 'src/app/shared/classes/models/question.class';
import { Response } from 'src/app/shared/classes/models/response.class';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;

  @Output()
  selectResponse = new EventEmitter<Response>();

  constructor() {}

  ngOnInit() {}

  public answer(response: Response) {
    console.log('answer', response);
    this.selectResponse.emit(response);
  }
}
