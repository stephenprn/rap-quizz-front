import { BaseClass } from './base.class';

export enum ResponseType {
  ARTIST = 'ARTIST',
  ALBUM = 'ALBUM',
  DATE = 'DATE',
  OTHER = 'OTHER'
}

enum QuestionResponseStatus {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG'
}

export class QuestionResponse {
  status: QuestionResponseStatus;
  response: Response;
}

export class Response extends BaseClass {
  label: string;
  type: ResponseType;

  constructor(label?: string) {
    super();

    if (label != null) {
      this.label = label;
    }
  }
}
