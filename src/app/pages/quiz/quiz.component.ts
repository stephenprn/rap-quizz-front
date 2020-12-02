import { Component, OnInit } from '@angular/core';
import { QuizApiService } from 'src/app/shared/services/api/quiz-api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quiz: any;

  constructor(private quizApiService: QuizApiService) {}

  ngOnInit() {
    this.generateQuiz();
  }

  private generateQuiz() {
    this.quizApiService.generate().subscribe((quiz: any) => {
      this.quiz = quiz;
    });
  }
}
