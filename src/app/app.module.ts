import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { JavaCompilerComponent } from './components/java-compiler/java-compiler.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthorisationService } from './services/authorisation.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatInputModule } from '@angular/material';
import { MainNavMenuComponent } from './components/main-nav-menu/main-nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileComponent } from './components/profile/profile.component';
import { CodeTesterComponent } from './components/code-tester/code-tester.component';
import { QuizesComponent } from './components/quizesFolder/quizes/quizes.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { ErrorInterceptorService } from './services/error-interceptor.service';
import { QuizCardComponent } from './components/quizesFolder/quiz-card/quiz-card.component';
import { MatCardModule } from '@angular/material/card';
import { QuizComponent } from './components/quizesFolder/quiz/quiz.component';
import { QuestionCardComponent } from './components/quizesFolder/question-card/question-card.component';
import { CountdownModule } from 'ngx-countdown';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { QuizSummaryComponent } from './components/quizesFolder/quiz-summary/quiz-summary.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChooseCompilerComponent } from './components/choose-compiler/choose-compiler.component';
import { GroovyCompilerComponent } from './components/groovy-compiler/groovy-compiler.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImageViewerModule } from 'ng2-image-viewer';
import { TreeGridModule } from '@syncfusion/ej2-angular-treegrid';
import { IgxDoughnutChartModule, IgxRingSeriesModule, IgxLegendModule, IgxItemLegendModule } from 'igniteui-angular-charts';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionOrderTypeComponent } from './components/quizesFolder/question-order-type/question-order-type.component';
import { NewQuizComponent } from './components/quizesFolder/new-quiz/new-quiz.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewQuestionOrderComponent } from './components/quizesFolder/new-question-order/new-question-order.component';
import { NewQuestionSingleChoiceComponent } from './components/quizesFolder/new-question-single-choice/new-question-single-choice.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { IgxGridModule, IgxSwitchModule, IgxSnackbarModule, IgxButtonGroupModule, IgxTreeGridModule, IgxSelectModule, IgxInputGroupModule } from "igniteui-angular";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GroupsToCourseComponent } from './components/quizesFolder/groups-to-course/groups-to-course.component';
import { ExercisesTeacherWindowComponent } from './components/exercises/exercises-teacher-window/exercises-teacher-window.component';
import { ExercisesUserTabviewComponent } from './components/exercises/exercises-user-tabview/exercises-user-tabview.component';
import { UserExerciseAnswerWindowComponent } from './components/exercises/user-exercise-answer-window/user-exercise-answer-window.component';
import { ExerciseAnswersTeacherWindowComponent } from './components/exercises/exercise-answers-teacher-window/exercise-answers-teacher-window.component';
import { AlertifyService } from './services/alertify.service';
import { MinuteSecondsPipe } from './pipes/minuteSecondsPipe';

@NgModule({
  declarations: [
    AppComponent,

    HomePageComponent,
    JavaCompilerComponent,
    PageNotFoundComponent,
    MainNavMenuComponent,
    ProfileComponent,
    CodeTesterComponent,
    QuizesComponent,
    SignInComponent,
    SignUpComponent,
    QuizCardComponent,
    QuizComponent,
    QuestionCardComponent,
    
    QuizSummaryComponent,
    ChooseCompilerComponent,
    GroovyCompilerComponent,
    QuestionOrderTypeComponent,
    NewQuizComponent,
    NewQuestionOrderComponent,
    NewQuestionSingleChoiceComponent,
    AdminPanelComponent,
    GroupsToCourseComponent,
    ExercisesTeacherWindowComponent,
    ExercisesUserTabviewComponent,
    UserExerciseAnswerWindowComponent,
    ExerciseAnswersTeacherWindowComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    HttpClientModule,
    MatCardModule,
    ReactiveFormsModule,
    CountdownModule,
    MatGridListModule,
    MatRadioModule,
    MatTooltipModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    ImageViewerModule,
    TreeGridModule,
    IgxTreeGridModule,
    IgxDoughnutChartModule,
    IgxRingSeriesModule,
    IgxSelectModule,
    IgxInputGroupModule,
    MatSelectModule,
    IgxRingSeriesModule,
		IgxLegendModule,
    IgxItemLegendModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    /*IgxGridModule,
		IgxTreeGridModule,
		IgxSwitchModule,
		IgxSnackbarModule,
		IgxButtonGroupModule,*/
    MonacoEditorModule.forRoot()
  ],
  providers: [
    AuthGuardService,
    AuthorisationService,
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
