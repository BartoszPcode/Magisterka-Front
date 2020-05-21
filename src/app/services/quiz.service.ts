import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuizCreated } from '../models/quizCreated';
import { environment } from 'src/environments/environment';
import { AnswerQuizDTO } from '../models/answerQuizDTO';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  public addQuiz(newQuiz: QuizCreated ){
    return this.http.put(`${environment.apiURL}Quiz/addQuiz`, newQuiz);
  }

  public getQuizesInCategory(categoryId: number){
    return this.http.get<any>(`${environment.apiURL}Quiz/getQuizesInCategory/` + categoryId);
  }

  public getQuizesToAnswer(quizId: number){
    return this.http.get<any>(`${environment.apiURL}Quiz/getQuizToAnswer/` + quizId);
  }

  public addAnswer(answer: AnswerQuizDTO ){
    return this.http.put(`${environment.apiURL}Quiz/quizAnswer`, answer);
  }
}
