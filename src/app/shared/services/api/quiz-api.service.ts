import { Quiz } from './../../classes/models/quiz.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestParameter, RestService } from '../rest.service';

@Injectable()
export class QuizApiService {
  private BASE_URL = '/quiz/';
  private URLS = {
    generateQuiz: this.BASE_URL + 'generate-quiz',
    joinQuiz: this.BASE_URL + 'join-quiz/',
  };

  constructor(private restService: RestService) {}

  public generateQuiz(
    nbrQuestions: string,
    questionDuration: string
  ): Observable<Quiz> {
    const params: RestParameter[] = [
      { name: 'question_duration', value: questionDuration },
      { name: 'nbr_questions', value: nbrQuestions },
    ];

    return this.restService.get(this.URLS.generateQuiz, params);
  }

  public joinQuiz(quizUrl: string): Observable<Quiz> {
    return this.restService.get(this.URLS.joinQuiz + quizUrl);
  }
}
