import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseAnswerForTeacherDTO } from 'src/app/models/exerciseDTOs/exerciseAnswerForTeacherDTO';
import { ExerciseAnswerSimpleInfoDTO } from 'src/app/models/exerciseDTOs/exerciseAnswerSimpleInfoDTO';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { PlagiarismComparisonElementDTO } from 'src/app/models/exerciseDTOs/plagiarismComparisonElementDTO';
import { FormControl } from '@angular/forms';
import { ExerciseAnswerPass } from 'src/app/models/exerciseDTOs/exerciseAnswerPass';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-exercise-answers-teacher-window',
  templateUrl: './exercise-answers-teacher-window.component.html',
  styleUrls: ['./exercise-answers-teacher-window.component.css']
})
export class ExerciseAnswersTeacherWindowComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  exerciseAnswers: ExerciseAnswerForTeacherDTO[];
  exerciseInfo: ExerciseAnswerSimpleInfoDTO;
  selectedUser: ExerciseAnswerForTeacherDTO;
  selected: PlagiarismComparisonElementDTO;
  selectedPlagiarismCode: string;
  
  displayedColumns: string[] = ['answerNumber', 'albumNo', 'group', 'exerciseClick', 'answerDate', 'plagiarismComputer', 'passed'];
  dataSource: MatTableDataSource<ExerciseAnswerForTeacherDTO>;
  editorOptions = {theme: 'vs-dark', language: 'java',  automaticLayout: true,};

  constructor(private activRouter: ActivatedRoute,
              private exerciseService: ExerciseService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.exerciseInfo = JSON.parse(this.activRouter.snapshot.params['exerciseInfo']);
    //this.idExercise = parseInt(this.activRouter.snapshot.paramMap.get('exerciseId'));
    this.loadExerciseAnswers();

  }

  loadExerciseAnswers(){
    this.exerciseService.getExerciseAnswers(this.exerciseInfo.idExercise).subscribe( data => {
      this.exerciseAnswers = data;
      this.dataSource = new MatTableDataSource(this.exerciseAnswers);
      this.dataSource.paginator = this.paginator;
      console.log(this.exerciseAnswers);
      console.log("Załadowane");
      this.markAllExercisesFalse();
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  getRecord(row){
    this.markAllExercisesFalse();
    row.exerciseClick = true;
    this.selectedUser = row;
    if(this.selectedUser.plagiarismElements.length > 0){
      this.selectedPlagiarismCode = this.selectedUser.plagiarismElements[0].exerciseUserAnswer;
      this.selected = this.selectedUser.plagiarismElements[0];
    }
  }

  markAllExercisesFalse(){
    if(this.exerciseAnswers != null){
      if(this.exerciseAnswers.length > 0){
        for(let i = 0; i < this.exerciseAnswers.length; i++)
        {
          this.exerciseAnswers[i].exerciseClick = false;
        }
      }    
    }    
  }

  userPlagiarismChanged(value){
    this.selectedPlagiarismCode = value.exerciseUserAnswer;
    //console.log(value);
  }

  convertDate(dateParameter: Date): string{
    let dateLocal = "" + dateParameter;
    let dateConverted = dateLocal.replace("T", " ");
    dateConverted = dateConverted.substring(0, dateConverted.length - 4);
    
    return dateConverted;
  }

  passed(){
    let pass = new ExerciseAnswerPass();
    pass.idExerciseAnswer = this.selectedUser.idExerciseAnswer;
    pass.pass = true;

    this.exerciseService.exerciseAnswerPass(pass).subscribe( data => {     
      this.alertifyService.success("Zapisano");
      this.markAllExercisesFalse();

      this.selectedUser = null;
      this.selected = null;
      this.selectedPlagiarismCode = null;
      this.loadExerciseAnswers();
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  notPassed(){
    let pass = new ExerciseAnswerPass();
    pass.idExerciseAnswer = this.selectedUser.idExerciseAnswer;
    pass.pass = false;

    this.exerciseService.exerciseAnswerPass(pass).subscribe( data => {     
      this.alertifyService.success("Zapisano");
      this.markAllExercisesFalse();
      
      this.selectedUser = null;
      this.selected = null;
      this.selectedPlagiarismCode = null;
      this.loadExerciseAnswers();
    }, error => {
      //fail
      this.alertifyService.errorServerConnection();
    });
  }
} 
