import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/shared/classes/models/question.class';
import { Quiz } from 'src/app/shared/classes/models/quiz.class';
import { QuizApiService } from 'src/app/shared/services/api/quiz-api.service';
import { Response } from 'src/app/shared/classes/models/response.class';
import { Answer } from 'src/app/shared/classes/others/answer.class';

enum QuizStatus {
  LOADING = 'LOADING',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED'
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  private quiz: Quiz;
  public currentQuestion: Question;
  private questionIndex: number;
  
  public QuizStatus = QuizStatus;
  public quizStatus: QuizStatus;


  constructor(
    private quizApiService: QuizApiService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initQuiz();
  }

  private initQuiz() {
    const quizUrl = this.route.snapshot.paramMap.get('quiz_url');

    if (quizUrl == null) {
      this.generateQuiz();
    } else {
      this.getQuiz(quizUrl);
    }
  }

  private generateQuiz() {
    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.generateQuiz().subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      this.location.go(`${this.location.path()}/${this.quiz.url}`);
      this.selectQuestion(0);
      this.quizStatus = QuizStatus.ONGOING;
    });
  }

  private getQuiz(quizUrl: string) {
    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.getQuiz(quizUrl).subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      this.quizStatus = QuizStatus.ONGOING;
    });
  }

  public anwserResponse(response: Response) {
    this.quizApiService
      .answerResponse(
        this.quiz,
        this.questionIndex,
        this.currentQuestion,
        response
      )
      .subscribe((answer: Answer) => {
        if (answer.next_question == null) {
          this.quizStatus = QuizStatus.FINISHED;
          this.currentQuestion = null;
          return;
        }

        this.quiz.questions.push(answer.next_question);
        this.selectQuestion();
      });
  }

  private selectQuestion(index?: number) {
    if (index != null) {
      this.questionIndex = index;
    } else {
      this.questionIndex++;
    }

    this.currentQuestion = this.quiz.questions[this.questionIndex];
  }
}
