import { Component, OnInit, Input } from '@angular/core';
import { QuizCard } from 'src/app/models/quizCard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.css']
})
export class QuizCardComponent implements OnInit {

  @Input() quiz: QuizCard;
  quizBackgroundImg: string ="https://i.ibb.co/9TFb5ww/Quiz-Background3.png";

  constructor(private router: Router) { }

  ngOnInit() {}

  goToQuiz(quizId: number){
    this.router.navigate(['/quiz/', quizId]);
  }

  goToExercises(){
    this.router.navigate(['/exercises/', this.quiz.idCategory]);
  }
}
