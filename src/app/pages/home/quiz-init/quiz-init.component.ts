import { AppConstants } from './../../../app.constants';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-quiz-init',
  templateUrl: './quiz-init.component.html',
  styleUrls: ['./quiz-init.component.scss'],
})
export class QuizInitComponent implements OnInit {
  public joinQuizFormGroup: FormGroup;
  public newQuizFormGroup: FormGroup;

  public userConnected: boolean;

  private readonly QUESTION_DURATION_DEFAULT = 30;
  public questionDurations: number[] = [5, 10, 30, 60, 0];
  private readonly NBR_QUESTIONS_DEFAULT = 20;
  public nbrQuestions: number[] = [5, 10, 20, 30, 50];
  public ICONS = AppConstants.ICONS;

  private promises = {
    userConnected: null,
  };

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initJoinQuizForm();
    this.initPromises();
  }

  private initPromises() {
    this.promises.userConnected = this.authenticationService.userConnected$.subscribe(
      (state: boolean) => {
        this.userConnected = state;
      }
    );
  }

  private initJoinQuizForm() {
    this.joinQuizFormGroup = new FormGroup({
      quizUrl: new FormControl('', [Validators.required]),
    });

    this.newQuizFormGroup = new FormGroup({
      questionDuration: new FormControl(this.QUESTION_DURATION_DEFAULT, [
        Validators.required,
      ]),
      nbrQuestions: new FormControl(this.NBR_QUESTIONS_DEFAULT, [
        Validators.required,
      ]),
    });
  }

  public newQuiz() {
    const queryParams: Params = {
      question_duration: this.newQuizFormGroup.get('questionDuration').value,
      nbr_questions: this.newQuizFormGroup.get('nbrQuestions').value,
    };

    this.router.navigate(['/quiz'], {
      queryParams,
    });
  }

  public joinQuiz() {
    if (this.joinQuizFormGroup.invalid) {
      return;
    }

    let quizUrl: string = this.joinQuizFormGroup.get('quizUrl').value;

    if (quizUrl.includes('/')) {
      quizUrl = quizUrl.split('/').pop();
    }

    this.router.navigate([`/quiz/${quizUrl}`]);
  }
}
