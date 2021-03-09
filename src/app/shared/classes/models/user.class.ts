import { BaseClass } from './base.class';

export class User extends BaseClass {
  username?: string;
  uuid?: string;

  constructor(username?: string, uuid?: string) {
    super();
    this.username = username;
    this.uuid = uuid;
  }
}

export class UserEvent {
  user: User;
  admin: boolean;
}