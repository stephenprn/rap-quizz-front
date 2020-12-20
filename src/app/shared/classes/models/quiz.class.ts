import { BaseClass } from './base.class';
import { Question } from './question.class';

export class Quiz extends BaseClass {
  description?: string;
  name: string;
  nbr_questions: number;
  url: string;
  questions: Question[];
}
