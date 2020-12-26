import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/shared/classes/models/question.class';
import { Quiz, UserQuiz } from 'src/app/shared/classes/models/quiz.class';
import { QuizApiService } from 'src/app/shared/services/api/quiz-api.service';
import { Response } from 'src/app/shared/classes/models/response.class';
import { Answer } from 'src/app/shared/classes/others/answer.class';
import { QuizSocketService } from 'src/app/shared/services/quiz-socket.service';
import { User } from 'src/app/shared/classes/models/user.class';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SocketEvent } from 'src/app/shared/classes/others/socket-event.class';
import { Player } from 'src/app/shared/classes/others/player.class';

enum QuizStatus {
  LOADING = 'LOADING',
  WAITING = 'WAITING',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  public quiz: Quiz;
  public currentQuestion: Question;
  private questionIndex: number;
  public score: number;
  public players: Player[] = [];

  public QuizStatus = QuizStatus;
  public quizStatus: QuizStatus;

  private promises = {
    userJoined: null,
    userLeaved: null,
  };

  constructor(
    private quizApiService: QuizApiService,
    private quizSocketService: QuizSocketService,
    private location: Location,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {}

  ngOnInit() {
    this.initPromises();
    this.quizSocketService.initSocket();
    this.initQuiz();
  }

  ngOnDestroy() {
    this.utilsService.unsubscribeAll(this.promises);
    this.quizSocketService.leaveRoom();
  }

  private initPromises() {
    this.promises.userJoined = this.quizSocketService.userJoined$.subscribe(
      (socketEvent: SocketEvent<User>) => {
        this.players.push({
          user: socketEvent.body,
          joinDate: socketEvent.timestamp,
          status: null
        });
      }
    );

    this.promises.userLeaved = this.quizSocketService.userLeaved$.subscribe(
      (socketEvent: SocketEvent<User>) => {
        this.players = this.players.filter(
          (player: Player) => player.user.uuid != socketEvent.body.uuid
        );
      }
    );
  }

  private initQuiz() {
    const quizUrl = this.route.snapshot.paramMap.get('quiz_url');

    if (quizUrl == null) {
      this.generateQuiz();
    } else {
      this.joinQuiz(quizUrl);
    }
  }

  private generateQuiz() {
    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.generateQuiz().subscribe((quiz: Quiz) => {
      this.quizSocketService.joinRoom(quiz.uuid);
      this.quiz = quiz;
      this.location.go(`${this.location.path()}/${this.quiz.url}`);

      // this.selectQuestion(0);
      // this.score = 0;
      this.quizStatus = QuizStatus.WAITING;
    });
  }

  private joinQuiz(quizUrl: string) {
    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.joinQuiz(quizUrl).subscribe((quiz: Quiz) => {
      this.quizSocketService.joinRoom(quiz.uuid);
      this.quiz = quiz;
      this.players = quiz.users.map(
        (userQuiz: UserQuiz) =>
          new Player(userQuiz.user as User, userQuiz.creation_date)
      );

      this.quizStatus = QuizStatus.WAITING;
    });
  }

  public startQuiz() {
    console.log('start quiz');
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
        answer.answer_right && this.score++;

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
