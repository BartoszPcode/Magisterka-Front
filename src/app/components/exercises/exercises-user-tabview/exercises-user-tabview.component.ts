import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ExercisesSimpleStudentView } from 'src/app/models/exerciseDTOs/exercisesSimpleStudentView';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { ExerciseSimpleInfoDTO } from 'src/app/models/exerciseDTOs/exerciseSimpleInfoDTO';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-exercises-user-tabview',
  templateUrl: './exercises-user-tabview.component.html',
  styleUrls: ['./exercises-user-tabview.component.css']
})
export class ExercisesUserTabviewComponent implements OnInit {

  constructor(private activRouter: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private authService: AuthorisationService,
              private alertifyService: AlertifyService) { }

  idCategory: number;
  userId: number;
  @Output() endExercisesWindow: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['exerciseNumber', 'exerciseQuestion', 'exerciseState', 'exerciseClick', 'btnAnswer'];
  dataSource: MatTableDataSource<ExercisesSimpleStudentView>;
  exercisesSimpleView: ExercisesSimpleStudentView[];

  ngOnInit() {
    this.idCategory = parseInt(this.activRouter.snapshot.paramMap.get('id'));
    this.userId = this.authService.currentUserValue.idUser;

    this.getExercisesStudentSimpleView();
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

  getExercisesStudentSimpleView(){
    this.exerciseService.getExerciseStudentSimpleView(this.idCategory, this.userId).subscribe( data => {
      this.exercisesSimpleView = data;
      this.dataSource = new MatTableDataSource(this.exercisesSimpleView);
      this.dataSource.paginator = this.paginator;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }

  goToAnswer(idExercise: number){
    let exerciseInfo = new ExerciseSimpleInfoDTO();
    exerciseInfo.idCategory = this.idCategory;
    exerciseInfo.idExercise = idExercise;
    this.router.navigate(['/exercise/answer/', JSON.stringify(exerciseInfo)]);
  }
}
