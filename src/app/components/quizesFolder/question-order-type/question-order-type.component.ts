import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuizQuestion } from 'src/app/models/quizQuestion';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'app-question-order-type',
  templateUrl: './question-order-type.component.html',
  styleUrls: ['./question-order-type.component.css']
})
export class QuestionOrderTypeComponent implements OnInit {

  @Input() question: QuizQuestion;
  constructor() { }

  ngOnInit() {
    this.checkAnswer();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.question.possibleAnswers, event.previousIndex, event.currentIndex);
    this.checkAnswer();
  }

  checkAnswer(){
    this.question.isAnswered = true;
    for(let i = 0; i < this.question.possibleAnswers.length; i++){
      if(this.question.possibleAnswers[i] != this.question.correctOrder[i]){
        this.question.isAnsweredCorrectly = false;
        return;
      }      
    }
    this.question.isAnsweredCorrectly = true; 
  }
  
}
