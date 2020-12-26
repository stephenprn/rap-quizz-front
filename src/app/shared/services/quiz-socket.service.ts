import { EventEmitter, Injectable } from '@angular/core';
import { io } from 'socket.io-client/dist/socket.io';
import { environment } from 'src/environments/environment';
import { User } from '../classes/models/user.class';
import { SocketEvent } from '../classes/others/socket-event.class';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class QuizSocketService {
  private readonly NAMESPACE = '/quiz';
  private socketEvents: { name: string; callback: Function }[] = [
    {
      name: 'user_joined',
      callback: (socketEvent: any) => {
        this.userJoined$.emit(new SocketEvent<User>(socketEvent));
      },
    },
    {
      name: 'user_leaved',
      callback: (socketEvent: any) => {
        this.userLeaved$.emit(new SocketEvent<User>(socketEvent));
      },
    },
  ];
  private socket: any;

  public userJoined$ = new EventEmitter<SocketEvent<User>>();
  public userLeaved$ = new EventEmitter<SocketEvent<User>>();

  constructor(private authenticationService: AuthenticationService) {}

  public initSocket() {
    this.socket = io(environment.apiUrl, {
      extraHeaders: {
        Authorization: `JWT ${this.authenticationService.token}`,
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

  public leaveRoom() {
    this.socket.close();
    this.socket = null;
  }
}
