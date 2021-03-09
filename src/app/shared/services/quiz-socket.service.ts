import { Player } from 'src/app/shared/classes/others/player.class';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client/dist/socket.io';
import { environment } from 'src/environments/environment';
import { Question } from '../classes/models/question.class';
import { Quiz } from '../classes/models/quiz.class';
import { User, UserEvent } from '../classes/models/user.class';
import { Answer } from '../classes/others/answer.class';
import { SocketEvent } from '../classes/others/socket-event.class';
import { AuthenticationService } from './authentication.service';
import { Response } from '../classes/models/response.class';

@Injectable()
export class QuizSocketService {
  private readonly NAMESPACE = '/quiz';
  private socketEvents: { name: string; callback: Function }[] = [
    {
      name: 'user_joined',
      callback: (socketEvent: any) => {
        this.userJoined$.emit(new SocketEvent<UserEvent>(socketEvent));
      },
    },
    {
      name: 'user_leaved',
      callback: (socketEvent: any) => {
        this.userLeaved$.emit(new SocketEvent<User>(socketEvent));
      },
    },
    {
      name: 'started',
      callback: (socketEvent: any) => {
        this.quizStarted$.emit(new SocketEvent<Question>(socketEvent));
      },
    },
    {
      name: 'admin_set',
      callback: (socketEvent: any) => {
        this.adminSet$.emit(new SocketEvent<User>(socketEvent));
      },
    },
    {
      name: 'user_answered',
      callback: (socketEvent: any) => {
        this.userAnswered$.emit(new SocketEvent<Answer>(socketEvent));
      },
    },
    {
      name: 'question',
      callback: (socketEvent: any) => {
        this.question$.emit(new SocketEvent<Question>(socketEvent));
      },
    },
    {
      name: 'finished',
      callback: () => {
        this.quizFinished$.emit();
      },
    },
  ];
  private socket: any;

  public userJoined$ = new EventEmitter<SocketEvent<UserEvent>>();
  public userLeaved$ = new EventEmitter<SocketEvent<User>>();
  public userAnswered$ = new EventEmitter<SocketEvent<Answer>>();
  public quizStarted$ = new EventEmitter<SocketEvent<Question>>();
  public adminSet$ = new EventEmitter<SocketEvent<User>>();
  public question$ = new EventEmitter<SocketEvent<Question>>();
  public quizFinished$ = new EventEmitter<SocketEvent<void>>();

  constructor(private authenticationService: AuthenticationService) {}

  public initSocket() {
    this.socket = io(environment.apiUrl, {
      extraHeaders: {
        Authorization: `Bearer ${this.authenticationService.token}`,
      },
      forceNew: true,
    });
    this.socket.nsp = this.NAMESPACE;
    this.initEvents();
  }

  private initEvents() {
    for (const socketEvent of this.socketEvents) {
      this.socket.on(socketEvent.name, socketEvent.callback);
    }
  }

  public joinRoom(quizUuid: string) {
    this.socket.emit('join', quizUuid);
  }

  public leaveRoom(quizUuid: string) {
    if (this.socket == null) {
      return;
    }

    this.socket.emit('close', quizUuid);
    this.socket.close();
    this.socket = null;
  }

  public startQuiz(quizUuid: string) {
    this.socket.emit('start', quizUuid);
  }

  public answerResponse(quiz: Quiz, question: Question, response: Response) {
    const data: any = {};

    data.quiz_uuid = quiz.uuid;
    data.question_uuid = question.uuid;
    data.response_uuid = response.uuid;

    this.socket.emit('answer_response', data);
  }
}
