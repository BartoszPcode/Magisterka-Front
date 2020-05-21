import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { empty, Observable, interval } from 'rxjs';
import { CategoryDisplayDTO } from 'src/app/models/categoryDisplayDTO';
import { QuestionSingleChoiceDTO } from 'src/app/models/questionSingleChoiceDTO';
import { QuestionBlocksOrdering } from 'src/app/models/questionBlocksOrdering';
import { QuizCreated } from 'src/app/models/quizCreated';
import { QuizInListDisplayDTO } from 'src/app/models/quizInListDisplayDTO';
import { TreeGridComponent, DataStateChangeEventArgs } from '@syncfusion/ej2-angular-treegrid';
import { map, take } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.css']
})
export class NewQuizComponent implements OnInit {
  selected = 'option2';
  @ViewChild('treegrid', {static: false}) treegrid: TreeGridComponent;
  categoryControl = new FormControl('');
  pointsToPass = new FormControl('', Validators.required );
  singleChoiceFlag: boolean = false;
  orderTypeFlag: boolean = false;
  categoryFlag: boolean = false;
  newCategoryFlag: boolean = false;
  newQuizFlag: boolean = false;
  userId: number;
  categoryAddedFlag: boolean = false;
  categoriesData: CategoryDisplayDTO[];
  selectedCategoryInfo: string;
  selectedCategoryName: string;
  quizName: string;
  quizCreated: QuizCreated = new QuizCreated();
  selectedCategoryId: number;
  exerciseFlag: boolean = false;

  quizes = [];
  questions: QuizInListDisplayDTO[] = [];
  quizTitle = new FormControl('', Validators.required);
  quizTime = new FormControl('', Validators.required);
  newCategoryName = new FormControl('', Validators.required);
  category = new FormControl({value: '', disabled: true }, Validators.required);
  pointsCounter = new FormControl({value: '', disabled: true }, Validators.required);
  addGroupFlag: boolean = false;

  constructor(private categoryService: CategoryService, 
              private quizService: QuizService, 
              private authService: AuthorisationService,
              private alertifyService: AlertifyService) {

    this.category.disable(); 
  }

  ngOnInit() {
    this.userId = this.authService.currentUserValue.idUser;
    this.loadUserCategories();
    this.quizCreated.questionBlockOrdering = [];
    this.quizCreated.questionsSingleChoice = [];
    this.quizCreated.maxPoints = 0;
  }

  loadUserCategories(){
    this.categoryService.getUserCategories(this.userId).subscribe( data => {
      this.categoriesData = data;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  categoryChanged(value){
    if(value != null){
      this.selectedCategoryInfo = value.categoryName + " (" + this.convertDate(value.createdDate) + ")";
      this.selectedCategoryName = value.categoryName;
      this.selectedCategoryId = value.idCategory;
      this.categoryAddedFlag = false;
      this.categoryFlag = true;
      this.newQuizFlag = false;
      this.newCategoryFlag = false;

      this.loadQuizesInCategories();
    }else{
      this.categoryFlag = false;
    }   
  }

  loadQuizesInCategories(){
    this.quizService.getQuizesInCategory(this.selectedCategoryId).subscribe( data => {
      this.quizes = data;
      if(this.quizes.length > 0){
        for(let i = 0; i < this.quizes.length; i ++)
        {
          this.quizes[i].quizDate = this.convertDate(this.quizes[i].quizDate); 
        }
      }
      this.categoryAddedFlag = false;
      this.categoryFlag = true;
      this.newQuizFlag = false;
      this.newCategoryFlag = false;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  newCategory(){
    this.newCategoryFlag = true;
    this.categoryAddedFlag = false;
    this.categoryFlag = false;
    this.newQuizFlag = false;
  }

  createNewCategory(){
    if(this.newCategoryName.invalid != true){
      let dateTime = new Date()
      let categoryAddDTO = {idUser: this.userId, categoryName: this.newCategoryName.value, createdDate: dateTime };
      
      this.categoryService.addCategory(categoryAddDTO).subscribe( next => {
        this.categoryAddedFlag = true;
        this.loadUserCategories();
        this.alertifyService.success("Zapisano");
      
      }, error => {
        this.alertifyService.errorServerConnection();
        this.categoryAddedFlag = false;
      });
    }
  }
  
  convertDate(dateParameter: Date): string{
    let dateLocal = "" + dateParameter;
    let dateConverted = dateLocal.replace("T", " ");
    dateConverted = dateConverted.substring(0, dateConverted.length - 4);
    
    return dateConverted;
  }

  cancelNewCategory(){
    this.newCategoryFlag = false;
    this.newCategoryName = new FormControl('', Validators.required);
  }

  newQuiz(){
    this.quizTitle = new FormControl('', Validators.required);
    this.quizTime = new FormControl('', Validators.required);
    this.pointsCounter = new FormControl({value: '', disabled: true }, Validators.required);
    this.pointsToPass = new FormControl('', Validators.required);
    this.quizCreated = new QuizCreated();
    this.quizCreated.questionBlockOrdering = [];
    this.quizCreated.questionsSingleChoice = [];
    this.quizCreated.maxPoints = 0;
    this.questions = [];
     
    this.newCategoryFlag = false;
    this.categoryAddedFlag = false;
    this.exerciseFlag = false;
    this.addGroupFlag = false;
    this.newQuizFlag = true;
  }

  oneChoiceQuestion(){
    this.orderTypeFlag = false;
    this.singleChoiceFlag = true;
  }

  orderQuestion(){
    this.singleChoiceFlag = false;
    this.orderTypeFlag = true;
  }

  addQuiz(){
      
    let correctFormFlag = true;

    if(this.quizTitle.valid == false){
      correctFormFlag = false;
      this.quizTitle.markAsDirty();
      this.quizTitle.markAsTouched();
    }
    
    if(this.quizTime.valid == false){
      correctFormFlag = false;
      this.quizTime.markAsDirty();
      this.quizTime.markAsTouched();
    }

    if(this.pointsToPass.valid == false){
      correctFormFlag = false;
      this.pointsToPass.markAsDirty();
      this.pointsToPass.markAsTouched();
    }

    if(this.questions.length == 0){
      correctFormFlag = false;
    }

    if(correctFormFlag == true){
      this.quizCreated.categoryId = this.selectedCategoryId;
      this.quizCreated.userId = this.userId;
      this.quizCreated.quizName = this.quizTitle.value;
      this.quizCreated.pointsToPass = this.pointsToPass.value;
      this.quizCreated.quizCreatedDate = new Date();
      this.quizCreated.timeForQuiz = this.quizTime.value;
      
      this.quizService.addQuiz(this.quizCreated).subscribe( next => {
        this.loadQuizesInCategories();
        this.alertifyService.success("Zapisano");
      }, error => {
        this.alertifyService.errorServerConnection();
      });
    }
  }

  cancelAddingQuestion(){
    this.singleChoiceFlag = false;
    this.orderTypeFlag = false;
  }

  endAddingOrderingQ(orderingFlag: boolean){
    this.orderTypeFlag = orderingFlag;
    this.pointsCounter.setValue(this.quizCreated.maxPoints);

    let createdQuestion = { 
      question: this.quizCreated.questionBlockOrdering[this.quizCreated.questionBlockOrdering.length - 1].question,
      questionType: "Blokowy", 
      points: this.quizCreated.questionBlockOrdering[this.quizCreated.questionBlockOrdering.length - 1].pointsForQuestion 
    };
    this.questions.push(createdQuestion);
    
    if(this.treegrid == null){
      console.log("treegrid == null");

    }else{
      console.log("treegrid != null");
      this.treegrid.refresh();
      
    }
  }

  endAddingSC(scFlag: boolean){
    this.singleChoiceFlag = scFlag;
    this.pointsCounter.setValue(this.quizCreated.maxPoints);
    
    let createdQuestion = { 
      question: this.quizCreated.questionsSingleChoice[this.quizCreated.questionsSingleChoice.length - 1].question,
      questionType: "Jednokrotnego wyboru", 
      points: this.quizCreated.questionsSingleChoice[this.quizCreated.questionsSingleChoice.length - 1].pointsForQuestion 
    };
    this.questions.push(createdQuestion);
    
    if(this.treegrid == null){
    }else{
      this.treegrid.refresh();   
    }
  }

  dataSourceChanged(){
    console.log("Zmiana w pytaniach!!!");
  }
  
  dataStateChange(value){
    console.log("Zmiana q pytaniach!!!");
  }

  addGroup(){ 
    this.newQuizFlag = false;
    this.exerciseFlag = false;
    this.addGroupFlag = true;
  }

  endAddingGroups(orderingFlag: boolean){
    this.addGroupFlag = false;
  }

  exercises(){
    this.newQuizFlag = false;
    this.addGroupFlag = false;
    this.exerciseFlag = true;
  }

  endExercisesWindow(endFlag: boolean){
    this.exerciseFlag = false;
  }
}
