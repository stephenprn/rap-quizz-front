import { BaseClass } from './base.class';
import { Question } from './question.class';
import { User } from './user.class';

export enum UserQuizStatus {
  ADMIN = 'ADMIN',
  PLAYER = 'PLAYER'
}

export class UserQuiz {
  creation_date: string;
  status: UserQuizStatus;
  user: User;
  score?: number;

  constructor({
    creation_date,
    status,
    user,
    score
  }: {
    creation_date: string;
    status: UserQuizStatus;
    user: User;
    score?: number;
  }) {
    this.creation_date = creation_date;
    this.status = status;
    this.user = user;
    this.score = score;
  }
}

export class Quiz extends BaseClass {
  description?: string;
  name: string;
  nbr_questions: number;
  question_duration: number;
  url: string;
  questions?: Question[];
  users?: UserQuiz[];

  constructor({
    description,
    name,
    nbr_questions,
    question_duration,
    url,
    questions,
    users
  }: {
    description?: string;
    name: string;
    nbr_questions: number;
    question_duration: number;
    url: string;
    questions?: Question[];
    users?: UserQuiz[];
  }) {
    super();

    this.description = description;
    this.name = name;
    this.nbr_questions = nbr_questions;
    this.question_duration = question_duration;
    this.url = url;
    this.questions = questions || [];
    this.users = users || [];
  }
}
