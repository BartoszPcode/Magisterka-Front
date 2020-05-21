import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray } from '@angular/forms';
import { QuizCreated } from 'src/app/models/quizCreated';
import { QuestionBlocksOrdering } from 'src/app/models/questionBlocksOrdering';
import { QuestionBlockAnswer } from 'src/app/models/questionBlockAnswer';
@Component({
  selector: 'app-new-question-order',
  templateUrl: './new-question-order.component.html',
  styleUrls: ['./new-question-order.component.css']
})
export class NewQuestionOrderComponent implements OnInit {
  
  question = new FormControl('', Validators.required);
  questionPoints = new FormControl('', Validators.required);
  parameterForm: FormGroup;
  @Input() quizCreated: QuizCreated;
  @Output() endAddingOrderingQ: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.parameterForm = new FormGroup({
      'paramName': new FormControl(null, Validators.required),
      'parametersName': new FormArray([])
    })

    this.addBlock();
  }

  addBlock(){
      const name = this.parameterForm.controls.paramName.value;
      const control = new FormControl( name, Validators.required ); 
      (<FormArray>this.parameterForm.get('parametersName')).push(control);
      this.parameterForm.controls.paramName.reset();
  }

  delete(index: number){  
    (<FormArray>this.parameterForm.get('parametersName')).removeAt(index);
  }

  addQuestion(){
    let correctFormFlag = true;

    if(this.questionPoints.valid == false){
      correctFormFlag = false;
      this.questionPoints.markAsDirty();
      this.questionPoints.markAsTouched();
    }

    if(this.question.valid == false){
      correctFormFlag = false;
      this.question.markAsDirty();
      this.question.markAsTouched();
    }

    const answersCounter = (<FormArray>this.parameterForm.get('parametersName')).controls.length;
    for( let i = 0; i< answersCounter; i++){
      let parameterValue: string = (<FormArray>this.parameterForm.get('parametersName')).controls[i].value;
      if(parameterValue != null){
      }else{
        correctFormFlag = false;
        (<FormArray>this.parameterForm.get('parametersName')).controls[i].markAsDirty();
        (<FormArray>this.parameterForm.get('parametersName')).controls[i].markAsTouched();
      }    
    }

    if(correctFormFlag == true){
      let questionordering = new QuestionBlocksOrdering();
      questionordering.pointsForQuestion = +this.questionPoints.value;
      questionordering.question = this.question.value;
   
      questionordering.answers = [];

      for( let i = 0; i < answersCounter; i++){
        let singleBlok = new QuestionBlockAnswer();
        singleBlok.answerBlock = (<FormArray>this.parameterForm.get('parametersName')).controls[i].value;
        singleBlok.answerPosition = i;
        questionordering.answers.push(singleBlok);
      }
      this.quizCreated.questionBlockOrdering.push(questionordering);
      this.quizCreated.maxPoints = this.quizCreated.maxPoints + questionordering.pointsForQuestion;

      this.endAddingOrderingQ.emit(false);
    }else{
      return;
    }
  }

  get parametersName() {
    return <FormArray>this.parameterForm.get('parametersName');
  }
}
