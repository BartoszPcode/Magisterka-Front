import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Quiz } from 'src/app/models/quiz';
import { QuizSummaryModel } from 'src/app/models/quizSummaryModel';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
import { AnswerQuizDTO } from 'src/app/models/answerQuizDTO';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {

  quizId: number;
  currentQuestionNumber: number;
  questionsAmount: number;
  timeLeft: number;
  interval;
  subscribeTimer: any;
  quizSummary: QuizSummaryModel;
  quiz: Quiz;
 
  constructor(private activRouter: ActivatedRoute,
              private router: Router,
              private quizService: QuizService,
              private authService: AuthorisationService,
              private alertifyService: AlertifyService) { }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.quizId = parseInt(this.activRouter.snapshot.paramMap.get('id'));
    this.takeQuizFromAPI(this.quizId);
    this.startTimer();
  }

  nextQuestion() {
    this.currentQuestionNumber++;
  }

  previousQuestion() {
    this.currentQuestionNumber--;
  }

  lastQuestion() {
    this.currentQuestionNumber = this.questionsAmount - 1;
  }

  firstQuestion() {
    this.currentQuestionNumber = 0;
  }

  takeQuizFromAPI(quizId: number) {
    this.quizService.getQuizesToAnswer(this.quizId).subscribe( data => {
      this.quiz = data;
      this.questionsAmount = this.quiz.quizQuestions.length;
      this.currentQuestionNumber = 0;
      this.timeLeft = this.quiz.timeForQuiz;
    }, error => {
      this.alertifyService.errorServerConnection();
    });    
  }

  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        //gdy skończy się czas
        this.quizEnd();
        clearInterval(this.interval);
      }
    }, 1000)
  }


  quizEnd() {
    let userPoints = 0;
    let passed = false;
    let correctAnswers = 0;
    for (let i = 0; i < this.quiz.quizQuestions.length; i++) {

      if (this.quiz.quizQuestions[i].isAnsweredCorrectly == true) {
        userPoints = userPoints + this.quiz.quizQuestions[i].pointsForQuestion;
        correctAnswers++;
      }
    }

    if (userPoints >= this.quiz.pointsToPass) {
      passed = true;
    }

    this.quizSummary = {
      quizTitle: this.quiz.quizTitle,
      maxPoints: this.quiz.maxPoints,
      pointsToPass: this.quiz.pointsToPass,
      userPoints: userPoints,
      passed: passed,
      questionsNumber: this.quiz.quizQuestions.length,
      correctAnswers: correctAnswers

    }

    //info do API
    let answerQuiz = new AnswerQuizDTO();
    answerQuiz.idQuiz = this.quizId;
    answerQuiz.idUser = this.authService.currentUserValue.idUser;
    answerQuiz.passed = passed;
    answerQuiz.userScore = userPoints;
    answerQuiz.answeredDate = new Date();

    this.quizService.addAnswer(answerQuiz).subscribe( next => {
      this.alertifyService.success("Zapisano wynik quizu");
    }, error => {
      this.alertifyService.errorServerConnection();
    });
    this.router.navigate(["quiz/" + this.quizId + "/summary"], { queryParams: this.quizSummary });
  }
}
