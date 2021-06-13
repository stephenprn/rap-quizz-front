import { BaseClass } from './base.class';
import { Response, QuestionResponse, ResponseType } from './response.class';
import { User } from './user.class';

export enum QuestionSubType {
  HIT = 'HIT',
  ARTIST_PICTURE = 'ARTIST_PICTURE',
  RANKING = 'RANKING',
  LYRICS = 'LYRICS',
  UNKNOWN = 'UNKNOWN'
}

export class Question extends BaseClass {
  label: string;
  explaination?: string;
  picture: string;
  responses: QuestionResponse[];
  author?: User;
  type?: ResponseType;
  sub_type?: QuestionSubType;
  index?: number;
  hidden?: boolean;
  rightResponse?: Response;
  response_precise?: string;

  constructor({ label }: { label: string }) {
    super();

    if (label != null) {
      this.label = label;
    }
    this.responses = [];
  }
}
