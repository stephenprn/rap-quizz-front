export class Article {
  body?: string;
  title: string;
  url?: string;

  constructor(title: string, body?: string) {
    this.title = title;

    if (this.body != null) {
      this.body = body;
    }
  }
}
