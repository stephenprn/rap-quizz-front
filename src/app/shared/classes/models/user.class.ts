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
