import { User } from '../models/user.class';
import cloneDeep from 'lodash/cloneDeep';

export enum PlayerAnswerStatus {
  RIGHT = 'RIGHT',
  WRONG = 'WRONG',
  NONE = 'NONE',
  ANSWERING = 'ANSWERING',
}

export class Player {
  user: User;
  joinDate: Date;
  admin: boolean;
  answerStatus: PlayerAnswerStatus;
  answerStatusHistory: PlayerAnswerStatus[];
  score: number;
  me?: boolean;
  rank?: number;

  constructor(user: User, admin: boolean, joinDate: Date, me?: boolean) {
    this.user = user;
    this.admin = !!admin;
    this.joinDate = joinDate;
    this.answerStatus = PlayerAnswerStatus.NONE;
    this.score = 0;

    if (me != null) this.me = me;
  }

  public initAnswerStatus(nbrQuestions: number) {
    this.answerStatusHistory = new Array(nbrQuestions).fill(
      PlayerAnswerStatus.NONE
    );

    this.answerStatusHistory[0] = PlayerAnswerStatus.ANSWERING;
  }

  public resetAnswerStatus(previousQuestionIndex: number) {
    let previousAnswerStatus: PlayerAnswerStatus;

    if (this.answerStatus === PlayerAnswerStatus.ANSWERING) {
      previousAnswerStatus = PlayerAnswerStatus.NONE;
    } else {
      previousAnswerStatus =  cloneDeep(
        this.answerStatus
      );
    }

    this.answerStatusHistory[previousQuestionIndex] = previousAnswerStatus;

    if (this.answerStatusHistory.length > previousQuestionIndex) {
      this.answerStatusHistory[previousQuestionIndex + 1] = PlayerAnswerStatus.ANSWERING;
    }

    this.answerStatus = PlayerAnswerStatus.NONE;
  }
}
