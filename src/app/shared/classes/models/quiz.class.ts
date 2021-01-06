import { BaseClass } from './base.class';
import { Question } from './question.class';
import { User } from './user.class';

export enum UserQuizStatus {
  ADMIN = "ADMIN",
  PLAYER = "PLAYER"
}

export class UserQuiz {
  creation_date: string;
  status: UserQuizStatus;
  user: User;
}

export class Quiz extends BaseClass {
  description?: string;
  name: string;
  nbr_questions: number;
  question_duration: number;
  url: string;
  questions?: Question[];
  users?: UserQuiz[];
}
