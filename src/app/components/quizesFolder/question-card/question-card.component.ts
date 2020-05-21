import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { QuizQuestion } from 'src/app/models/quizQuestion';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.css']
})
export class QuestionCardComponent implements OnInit {

  @Input() question: QuizQuestion;

  constructor() { }

  ngOnInit() {
  }

  giveAnswer($event: MatRadioChange){
    this.question.isAnswered = true;
    //jest $event.value ponieważ ngModel jeszcze nie zaktualizował nowej wartości podanej przez uzytkownika
    if($event.value == this.question.correctAnswer){
      this.question.isAnsweredCorrectly = true;
    }else{
      this.question.isAnsweredCorrectly = false;
    } 
  }
}
