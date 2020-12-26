export class SocketEvent<T> {
  body: T;
  timestamp: Date;

  constructor(event: { body: T; timestamp: string }) {
    this.body = event.body;
    this.timestamp = new Date(event.timestamp);
  }
}
