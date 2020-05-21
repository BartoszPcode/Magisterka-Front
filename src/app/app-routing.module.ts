import { NgModule, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JavaCompilerComponent } from './components/java-compiler/java-compiler.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CodeTesterComponent } from './components/code-tester/code-tester.component';
import { ProfileComponent } from './components/profile/profile.component';
import { QuizesComponent } from './components/quizesFolder/quizes/quizes.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { QuizComponent } from './components/quizesFolder/quiz/quiz.component';
import { QuizSummaryComponent } from './components/quizesFolder/quiz-summary/quiz-summary.component';
import { ChooseCompilerComponent } from './components/choose-compiler/choose-compiler.component';
import { GroovyCompilerComponent } from './components/groovy-compiler/groovy-compiler.component';
import { NewQuizComponent } from './components/quizesFolder/new-quiz/new-quiz.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ExercisesUserTabviewComponent } from './components/exercises/exercises-user-tabview/exercises-user-tabview.component';
import { UserExerciseAnswerWindowComponent } from './components/exercises/user-exercise-answer-window/user-exercise-answer-window.component';
import { ExerciseAnswersTeacherWindowComponent } from './components/exercises/exercise-answers-teacher-window/exercise-answers-teacher-window.component';

const appRoutes: Routes =[
    { path: 'home', component: HomePageComponent },
    { path: 'compiler', /*canActivate:[AuthGuardService],*/ component: ChooseCompilerComponent },
    { path: 'compiler/java', /*canActivate:[AuthGuardService],*/ component: JavaCompilerComponent },
    { path: 'compiler/groovy', /*canActivate:[AuthGuardService],*/ component: GroovyCompilerComponent },
    { path: 'code-tester', component: CodeTesterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'quizes', component: QuizesComponent },
    { path: "new-quiz", component: NewQuizComponent },
    { path: 'quiz/:id', component: QuizComponent },
    { path: 'exercises/:id', component: ExercisesUserTabviewComponent },
    { path: 'exercise/answer/:exerciseInfo', component: UserExerciseAnswerWindowComponent },
    { path: 'exercise/userAnswers/:exerciseInfo', component: ExerciseAnswersTeacherWindowComponent },
    { path: 'quiz/:id/summary', component: QuizSummaryComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'not-found', component: PageNotFoundComponent},
    { path: 'admin-panel', /*canActivate:[AuthGuardService],*/ component: AdminPanelComponent },
    
    //musi być ostatnie 
    { path: '**', redirectTo: '/not-found'}
    ];

@NgModule({
    imports:[ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule{

}