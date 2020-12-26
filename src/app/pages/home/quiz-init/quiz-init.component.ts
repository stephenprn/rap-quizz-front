import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-init',
  templateUrl: './quiz-init.component.html',
  styleUrls: ['./quiz-init.component.scss'],
})
export class QuizInitComponent implements OnInit {
  public joinQuizFormGroup: FormGroup;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initJoinQuizForm();
  }

  private initJoinQuizForm() {
    this.joinQuizFormGroup = new FormGroup({
      quizUrl: new FormControl('', [Validators.required]),
    });
  }

  public newQuiz() {
    this.router.navigate(['/quiz']);
  }

  public joinQuiz() {
    if (this.joinQuizFormGroup.invalid) {
      return;
    }

    this.router.navigate([
      `/quiz/${this.joinQuizFormGroup.get('quizUrl').value}`,
    ]);
  }
}
