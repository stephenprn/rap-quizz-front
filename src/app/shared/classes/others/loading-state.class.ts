export class LoadingState {
  first: boolean;
  more: boolean;

  constructor() {
    this.first = false;
    this.more = false;
  }

  public trigger() {
    if (!this.first) {
      this.first = true;
      return;
    }

    this.more = true;
  }

  public stop() {
    this.first = false;
    this.more = false;
  }
}
