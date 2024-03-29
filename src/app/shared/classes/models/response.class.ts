import { BaseClass } from './base.class';

export enum ResponseType {
  ARTIST = 'ARTIST',
  ALBUM = 'ALBUM',
  DATE = 'DATE',
  SONG = 'SONG',
  OTHER = 'OTHER',
  YEAR = 'YEAR'
}

export namespace ResponseType {
  export function isPrecise(type: ResponseType) {
    return type === ResponseType.YEAR;
  }

  export function isRegular(type: ResponseType) {
    return [
      ResponseType.ARTIST,
      ResponseType.ALBUM,
      ResponseType.DATE,
      ResponseType.SONG,
      ResponseType.OTHER
    ].includes(type);
  }
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

  constructor({
    label,
    uuid,
    type
  }: {
    label?: string;
    uuid?: string;
    type?: ResponseType;
  }) {
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
