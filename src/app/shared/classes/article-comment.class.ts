import { User } from './user.class';

export class ArticleComment {
  body?: string;
  creation_date?: string;
  user?: User;
  uuid?: string;

  constructor(body?: string) {
    if (this.body != null) {
      this.body = body;
    }
  }
}
