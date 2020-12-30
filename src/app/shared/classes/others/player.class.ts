import { UserQuizStatus } from '../models/quiz.class';
import { User } from '../models/user.class';
import cloneDeep from 'lodash/cloneDeep';

export enum PlayerAnswerStatus {
  RIGHT = 'RIGHT',
  WRONG = 'WRONG',
  NONE = 'NONE'
}

export class Player {
  user: User;
  joinDate: Date;
  status: UserQuizStatus;
  answerStatus: PlayerAnswerStatus;
  answerStatusHistory: PlayerAnswerStatus[];

  constructor(user: User, joinDate: Date) {
    this.user = user;
    this.joinDate = joinDate;
    this.answerStatus = PlayerAnswerStatus.NONE;
    this.answerStatusHistory = [];
  }

  public resetAnswerStatus() {
    this.answerStatusHistory.push(cloneDeep(this.answerStatus));
    this.answerStatus = PlayerAnswerStatus.NONE;
  }
}
