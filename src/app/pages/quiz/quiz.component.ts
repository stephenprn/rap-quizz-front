import { UiService } from './../../shared/services/ui.service';
import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/shared/classes/models/question.class';
import {
  Quiz,
  UserQuiz,
  UserQuizStatus
} from 'src/app/shared/classes/models/quiz.class';
import { QuizApiService } from 'src/app/shared/services/api/quiz-api.service';
import { Response } from 'src/app/shared/classes/models/response.class';
import { QuizSocketService } from 'src/app/shared/services/quiz-socket.service';
import { User, UserEvent } from 'src/app/shared/classes/models/user.class';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SocketEvent } from 'src/app/shared/classes/others/socket-event.class';
import {
  Player,
  PlayerAnswerStatus
} from 'src/app/shared/classes/others/player.class';
import { HttpErrorResponse } from '@angular/common/http';
import { Answer } from 'src/app/shared/classes/others/answer.class';
import { AuthenticationApiService } from 'src/app/shared/services/api/authentication-api.service';
import {
  AuthenticationService,
  AuthUser
} from 'src/app/shared/services/authentication.service';

enum QuizStatus {
  LOADING = 'LOADING',
  WAITING = 'WAITING',
  STARTING = 'STARTING',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED'
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit, OnDestroy {
  public quiz: Quiz;
  public currentQuestion: Question;
  private questionIndex: number;

  public me: Player;
  public players: Player[] = [];

  public QuizStatus = QuizStatus;
  public quizStatus: QuizStatus;

  private promises = {
    userJoined: null,
    userLeaved: null,
    quizStarted: null,
    question: null,
    adminSet: null,
    userAnswered: null,
    quizFinished: null
  };

  constructor(
    private quizApiService: QuizApiService,
    private authenticationApiService: AuthenticationApiService,
    private authenticationService: AuthenticationService,
    private quizSocketService: QuizSocketService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private utilsService: UtilsService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.refreshToken();
    this.initPromises();
    this.initQuiz();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy() {
    this.utilsService.unsubscribeAll(this.promises);
    this.quiz && this.quizSocketService.leaveRoom(this.quiz.uuid);
  }

  private refreshToken() {
    this.authenticationApiService.refreshToken().subscribe({
      next: (res: AuthUser) => {
        this.authenticationService.setAuthUser(res);
      }
    });
  }

  private initPromises() {
    this.quizSocketService.userJoined$.subscribe((a) => {
      console.log({ a });
    });
    this.promises.userJoined = this.quizSocketService.userJoined$.subscribe({
      next: (socketEvent: SocketEvent<UserEvent>) => {
        const player = new Player(
          socketEvent.body.user,
          socketEvent.body.admin,
          socketEvent.timestamp,
          socketEvent.body.user.color,
          socketEvent.body.user.uuid === this.authenticationService.user.uuid
        );

        if (player.me) {
          this.me = player;
        }

        this.players.push(player);
      }
    });

    this.promises.userLeaved = this.quizSocketService.userLeaved$.subscribe({
      next: (socketEvent: SocketEvent<User>) => {
        this.players = this.players.filter(
          (player: Player) => player.user.uuid !== socketEvent.body.uuid
        );
      }
    });

    this.promises.quizStarted = this.quizSocketService.quizStarted$.subscribe({
      next: (socketEvent: SocketEvent<Question>) => {
        this.initUsersAnswerStatus(this.quiz.nbr_questions);
        this.quizStatus = QuizStatus.STARTING;
        this.quiz.questions = [socketEvent.body];
      }
    });

    this.promises.userAnswered = this.quizSocketService.userAnswered$.subscribe(
      {
        next: (socketEvent: SocketEvent<Answer>) => {
          const player = this.players.find(
            (p: Player) => p.user.uuid === socketEvent.body.user.uuid
          );

          if (socketEvent.body.answer_correct) {
            player.answerStatus = PlayerAnswerStatus.RIGHT;
            player.score++;
          } else {
            player.answerStatus = PlayerAnswerStatus.WRONG;
          }
        }
      }
    );

    this.promises.question = this.quizSocketService.question$.subscribe({
      next: (socketEvent: SocketEvent<Question>) => {
        this.resetUsersAnswersStatus(this.quiz.questions.length - 1);
        this.sortPlayersAndSetRank();
        this.quiz.questions.push(socketEvent.body);
        this.selectQuestion();
      }
    });

    this.promises.adminSet = this.quizSocketService.adminSet$.subscribe({
      next: (socketEvent: SocketEvent<User>) => {
        const admin = this.players.find(
          (player) => player.user.uuid === socketEvent.body.uuid
        );

        if (admin != null) {
          admin.admin = true;
          this.uiService.displayToast(
            `${
              admin.me ? 'Vous êtes ' : admin.user.username + ' est'
            } le nouvel admin`
          );
        }
      }
    });

    this.promises.quizFinished = this.quizSocketService.quizFinished$.subscribe(
      {
        next: () => {
          this.sortPlayersAndSetRank();
          this.quizStatus = QuizStatus.FINISHED;
        }
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

  public startCountdownFinished() {
    this.selectQuestion(0);
    this.quizStatus = QuizStatus.ONGOING;
  }

  private generateQuiz() {
    const questionDuration = this.route.snapshot.queryParams.question_duration;
    const nbrQuestions = this.route.snapshot.queryParams.nbr_questions;

    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.generateQuiz(nbrQuestions, questionDuration).subscribe({
      next: (quiz: Quiz) => {
        this.quizSocketService.initSocket();
        this.quizSocketService.joinRoom(quiz.uuid);
        this.quiz = quiz;
        this.location.go(`${window.location.pathname}/${this.quiz.url}`);
        this.quizStatus = QuizStatus.WAITING;
      }
    });
  }

  public startQuiz() {
    this.quizSocketService.startQuiz(this.quiz.uuid);
  }

  public anwserResponse({
    response,
    precise
  }: {
    response?: Response;
    precise?: string;
  }) {
    this.quizSocketService.answerResponse(
      this.quiz,
      this.currentQuestion,
      response,
      precise
    );
  }

  private joinQuiz(quizUrl: string) {
    this.quizStatus = QuizStatus.LOADING;

    this.quizApiService.joinQuiz(quizUrl).subscribe({
      next: (quiz: Quiz) => {
        this.quizSocketService.initSocket();
        this.quizSocketService.joinRoom(quiz.uuid);
        this.quiz = quiz;
        this.players = quiz.users.map(
          (userQuiz: UserQuiz) =>
            new Player(
              userQuiz.user as User,
              userQuiz.status === UserQuizStatus.ADMIN,
              new Date(userQuiz.creation_date),
              userQuiz.user.color
            )
        );

        this.quizStatus = QuizStatus.WAITING;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.uiService.displayToast(err.error.description, true);
          this.router.navigate(['/']);
        }
      }
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

  private resetUsersAnswersStatus(previousQuestionIndex: number) {
    this.players.forEach((player: Player) => {
      player.resetAnswerStatus(previousQuestionIndex);
    });
  }

  private initUsersAnswerStatus(nbrQuestions: number) {
    this.players.forEach((player: Player) => {
      player.initAnswerStatus(nbrQuestions);
    });
  }

  private sortPlayersAndSetRank() {
    this.players = this.players.sort((p1: Player, p2: Player) => {
      return (
        p1.score - p2.score || p1.user.username.localeCompare(p2.user.username)
      );
    });

    this.players.forEach((p: Player, i: number) => {
      p.rank = i + 1;
    });
  }
}
