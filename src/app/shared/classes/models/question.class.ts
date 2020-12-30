import { BaseClass } from './base.class';
import { QuestionResponse } from './response.class';
import { User } from './user.class';

export class Question extends BaseClass {
  label: string;
  responses: QuestionResponse[];
  author?: User;
  type?: ResponseType;

  constructor(label: string) {
    super();

    if (label != null) {
      this.label = label;
    }
    this.responses = [];
  }
}
