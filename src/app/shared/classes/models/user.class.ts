import { BaseClass } from './base.class';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export class User extends BaseClass {
  username?: string;
  uuid?: string;
  role?: UserRole;
  color?: string;

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
