import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CompileSend } from 'src/app/models/compileSend';
import { CompilerService } from 'src/app/services/compiler.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@Component({
  selector: 'app-groovy-compiler',
  templateUrl: './groovy-compiler.component.html',
  styleUrls: ['./groovy-compiler.component.css']
})
export class GroovyCompilerComponent implements OnInit {

  compiledCodeResponse: string = '';
  parameterForm: FormGroup;
  editorOptions = {theme: 'vs-dark', language: 'java',  automaticLayout: true,};
  codeJava: string= 'public class Hello {\n \tpublic static void main(String[] args){\n \t\tSystem.out.print("Hello World");\n\t}\n }'; 
  codeGroovy: string = 'class AGroovyBean {\n String color\n }\n def myGroovyBean = new AGroovyBean()\n myGroovyBean.setColor(\'baby blue\')\n assert myGroovyBean.getColor() == \'baby blue\' ';
  codeGroovy2: string = '\n class GroovyDateInitialization { \n\n \tstatic main(args) { \n \t\tprintln "Hello world"\n\t} \n}';
  helpMessage: string = 'Dane wejściowe to dane, które należy podać w konsoli podczas pracy programu. Parametr_0 zostanie podany jako pierwszy, parametr_1 jako drugi itd.';
  
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
              private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.parameterForm = new FormGroup({
      'paramName': new FormControl(null, Validators.required),
      'parametersName': new FormArray([])
    })
  }

  get parametersName() {
    return <FormArray>this.parameterForm.get('parametersName');
  }
  
  save(){}

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
      code: this.codeGroovy2,
      parameters: params
    }

    console.log(compileSend);
    this.compilerService.compileGroovy(compileSend)
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

  download(){
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
    this.showConsole = false;
  }

  unfoldMore(){
    this.showConsole = true;
  }

}
