import { UserQuizStatus } from '../models/quiz.class';
import { User } from '../models/user.class';

export class Player {
  user: User;
  joinDate: Date;
  status: UserQuizStatus;

  constructor(user: User, joinDateStr: string) {
    this.user = user;
    this.joinDate = new Date(joinDateStr);
  }
}
