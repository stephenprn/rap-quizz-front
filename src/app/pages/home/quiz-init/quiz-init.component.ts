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
  public questionDurations: { value: number; name: string }[] = [
    { value: 5, name: '5 secondes' },
    { value: 10, name: '10 secondes' },
    { value: 30, name: '30 secondes' },
    { value: 60, name: '1 minute' },
    { value: 0, name: 'illimité' },
  ];
  private readonly NBR_QUESTIONS_DEFAULT = 20;
  public nbrQuestions: { value: number; name: string }[] = [
    { value: 5, name: '5' },
    { value: 10, name: '10' },
    { value: 20, name: '20' },
    { value: 30, name: '30' },
    { value: 50, name: '50' },
  ];

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
