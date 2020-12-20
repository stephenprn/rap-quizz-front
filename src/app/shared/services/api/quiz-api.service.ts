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
    getQuiz: this.BASE_URL + 'resume-quiz/',
    answerResponse: this.BASE_URL + 'answer-response/',
  };

  constructor(private restService: RestService) {}

  public generateQuiz(): Observable<Quiz> {
    return this.restService.get(this.URLS.generateQuiz);
  }

  public getQuiz(quizUrl: string): Observable<Quiz> {
    return this.restService.get(this.URLS.getQuiz + quizUrl);
  }

  public answerResponse(
    quiz: Quiz,
    questionIndex: number,
    question: Question,
    response: Response
  ): Observable<Answer> {
    const formData = new FormData();

    formData.append('question_index', String(questionIndex));
    formData.append('question_uuid', question.uuid);
    formData.append('response_uuid', response.uuid);

    return this.restService.post(this.URLS.answerResponse + quiz.url, formData);
  }
}