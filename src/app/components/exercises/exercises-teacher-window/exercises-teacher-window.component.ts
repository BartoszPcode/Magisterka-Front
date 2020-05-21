import { Component, OnInit, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ExerciseSimpleViewDTO } from 'src/app/models/exerciseDTOs/exerciseSimpleViewDTO';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { AddExerciseDTO } from 'src/app/models/exerciseDTOs/addExerciseDTO';
import { Router } from '@angular/router';
import { ExerciseAnswerSimpleInfoDTO } from 'src/app/models/exerciseDTOs/exerciseAnswerSimpleInfoDTO';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-exercises-teacher-window',
  templateUrl: './exercises-teacher-window.component.html',
  styleUrls: ['./exercises-teacher-window.component.css']
})
export class ExercisesTeacherWindowComponent implements OnInit {
  
  @Input() idCategory: number;
  @Output() endExercisesWindow: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
  question = new FormControl('', Validators.required);

  dataSource: MatTableDataSource<ExerciseSimpleViewDTO>;

  constructor(private exerciseService: ExerciseService,
              private router: Router,
              private alertifyService: AlertifyService) { }

  exercisesSimpleView: ExerciseSimpleViewDTO[];
  displayedColumns: string[] = ['exerciseNumber', 'exerciseQuestion', 'exerciseClick','btnCheck'];

  ngOnInit() {
    this.getExercisesSimpleView();
  }

  closeWindowExercises(){
    this.endExercisesWindow.emit(false);
  }

  getRecord(row){
    this.markAllExercisesFalse();
    row.exerciseClick = true;
  }

  markAllExercisesFalse(){
    if(this.exercisesSimpleView != null){
      if(this.exercisesSimpleView.length > 0){
        for(let i = 0; i < this.exercisesSimpleView.length; i++)
        {
          this.exercisesSimpleView[i].exerciseClick = false;
        }
      }    
    }    
  }

  getExercisesSimpleView(){
    this.exerciseService.getExercisesInCategory(this.idCategory).subscribe( data => {
      this.exercisesSimpleView = data;
      this.dataSource = new MatTableDataSource(this.exercisesSimpleView);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  goIntoAnswers(exerciseId: number, question: string){
    let exerciseInfo = new ExerciseAnswerSimpleInfoDTO();
    exerciseInfo.idExercise = exerciseId;
    exerciseInfo.exerciseQuestion = question;
    this.router.navigate(['/exercise/userAnswers/', JSON.stringify(exerciseInfo)]);
  }

  addExercise(){
    if(this.question.value != null){
      let exercise = new AddExerciseDTO();
      exercise.exerciseQuestion = this.question.value;
      exercise.idCategory = this.idCategory;
      this.exerciseService.addExercise(exercise).subscribe( 
        data => {
          this.getExercisesSimpleView();
          this.question.setValue("");
          this.question.markAsUntouched();
          this.alertifyService.success("Zapisano");
        }, error =>{
          this.alertifyService.errorServerConnection();
        });
    }else{
      this.question.markAsDirty();
      this.question.markAsTouched();
    }   
  }
}
