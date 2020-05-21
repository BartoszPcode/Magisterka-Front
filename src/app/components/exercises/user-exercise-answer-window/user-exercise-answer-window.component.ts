import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/forms';
import { CompileSend } from 'src/app/models/compileSend';
import { CompilerService } from 'src/app/services/compiler.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ExerciseService } from 'src/app/services/exercise.service';
import { AuthorisationService } from 'src/app/services/authorisation.service';
import { ExerciseForStudentDTO } from 'src/app/models/exerciseDTOs/exerciseForStudentDTO';
import { ExerciseAnswerDTO } from 'src/app/models/exerciseDTOs/exerciseAnswerDTO';
import { ExerciseSimpleInfoDTO } from 'src/app/models/exerciseDTOs/exerciseSimpleInfoDTO';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-exercise-answer-window',
  templateUrl: './user-exercise-answer-window.component.html',
  styleUrls: ['./user-exercise-answer-window.component.css']
})
export class UserExerciseAnswerWindowComponent implements OnInit {

  compiledCodeResponse: string = '';
  parameterForm: FormGroup;
  editorOptions = {theme: 'vs-dark', language: 'java',  automaticLayout: true,};
  codeJava: string= 'public class Hello {\n \tpublic static void main(String[] args){\n \t\tSystem.out.print("Hello World");\n\t}\n }'; 
  helpMessage: string = 'Dane wejściowe to dane, które należy podać w konsoli podczas pracy programu. Parametr_0 zostanie podany jako pierwszy, parametr_1 jako drugi itd.';
  exerciseInfo: ExerciseSimpleInfoDTO;
  userId: number;
  exerciseDTO: ExerciseForStudentDTO;
  showConsole: boolean = true;
  isCompiling: boolean = false;
  consoleEditor = {
    theme: "vs-dark",
    automaticLayout: true,
    wordWrap: 'on',
    wrappingIndent: 'none',
    readOnly: true
  };
  
  constructor(private compilerService: CompilerService,
              private activRouter: ActivatedRoute,
              private router: Router,
              private exerciseService: ExerciseService,
              private authService: AuthorisationService,
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.exerciseInfo = JSON.parse(this.activRouter.snapshot.params['exerciseInfo']);

    //this.activRouter.params.subscribe((params: Params) => this.exerciseInfo = params['exerciseInfo']);
    //this.exerciseInfo = parseInt(this.activRouter.snapshot.paramMap.get('exerciseInfo'));

    this.userId = this.authService.currentUserValue.idUser;

    this.parameterForm = new FormGroup({
      'paramName': new FormControl(null, Validators.required),
      'parametersName': new FormArray([])
    })

    this.loadExercise();
  }

  saveAnswer(){
    let exerciseAnswer = new ExerciseAnswerDTO();
    exerciseAnswer.idUser = this.userId;
    exerciseAnswer.idExercise = this.exerciseInfo.idExercise;
    exerciseAnswer.exerciseUserAnswer = this.codeJava;
    exerciseAnswer.exerciseAnswerDate = new Date();

    this.exerciseService.saveExerciseAnswer(exerciseAnswer).subscribe( 
      data => {
        this.router.navigate(['/exercises/', this.exerciseInfo.idCategory]);
        this.alertifyService.success("Zapisano");
      }, error =>{
        this.alertifyService.errorServerConnection();
      });

  }

  loadExercise(){
    this.exerciseService.getExerciseForStudent(this.exerciseInfo.idExercise).subscribe( data => {
      this.exerciseDTO = data;
    }, error => {
      this.alertifyService.errorServerConnection();
    });
  }
  
  compile(){
    this.isCompiling = true;
    let params: string[] = [];
    const parametersCounter = (<FormArray>this.parameterForm.get('parametersName')).controls.length;

    if( parametersCounter > 0){

      for( let i = 0; i< parametersCounter; i++){
        let parameterValue: string = (<FormArray>this.parameterForm.get('parametersName')).controls[i].value;
        params.push(parameterValue);     
      }
    }
    let compileSend: CompileSend={
      code: this.codeJava,
      parameters: params
    }

    console.log(compileSend);
    this.compilerService.compileJava(compileSend)
        .subscribe(
            data => {   
              this.compiledCodeResponse = data.value;
              this.showConsole = true;
              this.isCompiling = false;
            },
            error => {
              this.compiledCodeResponse = error;
              this.alertifyService.errorServerConnection();
              this.isCompiling = false; 
            });           
  }

  addParameter(){
    if(this.parameterForm.controls.paramName.valid){
      console.log(this.parameterForm);
      const name = this.parameterForm.controls.paramName.value;
      const control = new FormControl( name, Validators.required );
      (<FormArray>this.parameterForm.get('parametersName')).push(control);
      this.parameterForm.controls.paramName.reset();
    } 
  }

  delete(index: number){  
    (<FormArray>this.parameterForm.get('parametersName')).removeAt(index);
  }

  unfoldLess(){
    console.log("Klikam");
    this.showConsole = false;
  }

  unfoldMore(){
    this.showConsole = true;
  }

  get parametersName() {
    return <FormArray>this.parameterForm.get('parametersName');
  }
}
