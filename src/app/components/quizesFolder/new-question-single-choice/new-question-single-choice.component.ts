import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { QuestionSingleChoiceDTO } from 'src/app/models/questionSingleChoiceDTO';
import { QuizCreated } from 'src/app/models/quizCreated';

@Component({
  selector: 'app-new-question-single-choice',
  templateUrl: './new-question-single-choice.component.html',
  styleUrls: ['./new-question-single-choice.component.css']
})
export class NewQuestionSingleChoiceComponent implements OnInit {
  
  @Input() quizCreated: QuizCreated;
  @Output() endAdding: EventEmitter<boolean> = new EventEmitter();
  
  question = new FormControl('', Validators.required);
  questionPoints = new FormControl('', Validators.required);
  correctAnswer = new FormControl('', Validators.required);
  parameterForm: FormGroup;
  
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
       
    if(this.correctAnswer.valid == false){
      correctFormFlag = false;
      this.correctAnswer.markAsDirty();
      this.correctAnswer.markAsTouched();
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
      let questionSC = new QuestionSingleChoiceDTO();
      questionSC.correctAnswer = this.correctAnswer.value;
      questionSC.pointsForQuestion = +this.questionPoints.value;
      questionSC.question = this.question.value;
      questionSC.possibleAnswers = [];

      for( let i = 0; i < answersCounter; i++){
        questionSC.possibleAnswers.push((<FormArray>this.parameterForm.get('parametersName')).controls[i].value);
      }
      this.quizCreated.questionsSingleChoice.push(questionSC);
      this.quizCreated.maxPoints = this.quizCreated.maxPoints + questionSC.pointsForQuestion;

      this.endAdding.emit(false);
    }else{
      return;
    }
  }

  get parametersName() {
    return <FormArray>this.parameterForm.get('parametersName');
  }
}
