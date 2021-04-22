import { BaseClass } from './base.class';

export enum ResponseType {
  ARTIST = 'ARTIST',
  ALBUM = 'ALBUM',
  DATE = 'DATE',
  OTHER = 'OTHER'
}

export enum QuestionResponseStatus {
  CORRECT = 'CORRECT',
  WRONG = 'WRONG'
}

export class QuestionResponse {
  status?: QuestionResponseStatus;
  response: Response;
}

export class Response extends BaseClass {
  label: string;
  type: ResponseType;
  selected?: boolean;

  constructor({ label, uuid, type }: { label?: string, uuid?: string, type?: ResponseType }) {
    super();

    if (label != null) {
      this.label = label;
    }

    if (uuid != null) {
      this.uuid = uuid;
    }

    if (type != null) {
      this.type = type;
    }
  }
}
