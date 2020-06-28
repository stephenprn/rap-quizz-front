import { User } from './user.class';

export class Article {
  body?: string;
  title: string;
  url?: string;
  creation_date?: string;
  user?: User;
  nbr_views?: number;

  constructor(title: string, body?: string) {
    this.title = title;

    if (this.body != null) {
      this.body = body;
    }
  }
}
