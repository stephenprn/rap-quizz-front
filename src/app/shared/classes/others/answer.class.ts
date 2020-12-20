import { Question } from '../models/question.class';

export class Answer {
  answer_right: boolean;
  next_question: Question;
}
