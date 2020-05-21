import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddExerciseDTO } from '../models/exerciseDTOs/addExerciseDTO';
import { ExerciseAnswerDTO } from '../models/exerciseDTOs/exerciseAnswerDTO';
import { ExerciseAnswerPass } from '../models/exerciseDTOs/exerciseAnswerPass';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  public getExercisesInCategory(categoryId: number){
    return this.http.get<any>(`${environment.apiURL}Exercise/getExercisesInCategory/` + categoryId);
  }

  public getExerciseForStudent(exerciseId: number){
    return this.http.get<any>(`${environment.apiURL}Exercise/getExerciseForStudent/` + exerciseId);
  }

  public getExerciseStudentSimpleView(categoryId: number, userId: number){
    return this.http.get<any>(`${environment.apiURL}Exercise/getExercisesUserView/` + categoryId + `/` + userId);
  }

  public getExerciseAnswers(exerciseId: number){
    return this.http.get<any>(`${environment.apiURL}Exercise/getExerciseAnswers/` + exerciseId );
  }
  public addExercise(addExerciseDTO: AddExerciseDTO ){
    return this.http.put(`${environment.apiURL}Exercise/addExercise`, addExerciseDTO);
  }

  public saveExerciseAnswer(exerciseAnswer: ExerciseAnswerDTO ){
    return this.http.put(`${environment.apiURL}Exercise/saveExerciseAnswer`, exerciseAnswer);
  }

  public exerciseAnswerPass(passed: ExerciseAnswerPass ){
    return this.http.put(`${environment.apiURL}Exercise/answer/pass`, passed);
  }
}
