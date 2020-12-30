import { Quiz } from './../../classes/models/quiz.class';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';
import { Answer } from '../../classes/others/answer.class';
import { Question } from '../../classes/models/question.class';
import { Response } from '../../classes/models/response.class';

@Injectable()
export class QuizApiService {
  private BASE_URL = '/quiz/';
  private URLS = {
    generateQuiz: this.BASE_URL + 'generate-quiz',
    joinQuiz: this.BASE_URL + 'join-quiz/',
    answerResponse: this.BASE_URL + 'answer-response/',
  };

  constructor(private restService: RestService) {}

  public generateQuiz(): Observable<Quiz> {
    return this.restService.get(this.URLS.generateQuiz);
  }

  public joinQuiz(quizUrl: string): Observable<Quiz> {
    return this.restService.get(this.URLS.joinQuiz + quizUrl);
  }
}
