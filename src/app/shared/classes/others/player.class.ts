import { UserQuizStatus } from '../models/quiz.class';
import { User } from '../models/user.class';
import cloneDeep from 'lodash/cloneDeep';

export enum PlayerAnswerStatus {
  RIGHT = 'RIGHT',
  WRONG = 'WRONG',
  NONE = 'NONE',
}

export class Player {
  user: User;
  joinDate: Date;
  admin: boolean;
  answerStatus: PlayerAnswerStatus;
  answerStatusHistory: PlayerAnswerStatus[];
  score: number;
  me?: boolean;

  constructor(user: User, admin: boolean, joinDate: Date, me?: boolean) {
    this.user = user;
    this.admin = !!admin;
    this.joinDate = joinDate;
    this.answerStatus = PlayerAnswerStatus.NONE;
    this.answerStatusHistory = [];
    this.score = 0;

    if (me != null) this.me = me;
  }

  public resetAnswerStatus() {
    this.answerStatusHistory.push(cloneDeep(this.answerStatus));
    this.answerStatus = PlayerAnswerStatus.NONE;
  }
}
