import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TestCodeService } from 'src/app/services/test-code.service';
import { TestCodeSend } from 'src/app/models/testCodeSend';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CodeTestClassInfoDTO } from 'src/app/models/codeTestClassInfoDTO';
import { CodeClassStatisticDataTreeDTO } from 'src/app/models/codeClassStatisticDataTreeDTO';
import { CodeMethodeStatisticDataTreeDTO } from 'src/app/models/codeMethodeStatisticDataTreeDTO';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';
import { CodeTestClassChartsDTO } from 'src/app/models/codeTestClassChartsDTO';
import { IgxDoughnutChartComponent } from 'igniteui-angular-charts';
import { SingleInformationWithNumberDTO } from 'src/app/models/singleInformationWithNumberDTO';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-code-tester',
  templateUrl: './code-tester.component.html',
  styleUrls: ['./code-tester.component.css']
})

export class CodeTesterComponent implements OnInit {

  editorOptions = {theme: 'vs-dark', language: 'java',  automaticLayout: true,};
  codeJava: string= 'public class Hello {\n \t public int x = 1; \n \t public static void main(String[] args){\n \t\tSystem.out.print("Hello World");\n\t}\n }\n'; 
  graphGenerated: boolean = false;
  image: string;
  imagePath: SafeResourceUrl;
  codeTestClassInfo: CodeTestClassInfoDTO[];
  classDataForTree: CodeClassStatisticDataTreeDTO[] = [];
  showGridData: boolean = false;
  public items: string[] = ["Orange", "Apple", "Banana", "Mango"];
  selected: string = "Opcja";
  public data: any;
  classInfoChart: CodeTestClassChartsDTO[];
  methodesForChart: SingleInformationWithNumberDTO[];
  fieldsForChart: SingleInformationWithNumberDTO[];
  showChart: boolean = false;
  methodeFlag: boolean = false;
  fieldFlag: boolean = false;
  isCompiling: boolean = false;

  @ViewChild('treegrid', {static: false}) treegrid: TreeGridComponent;
  @ViewChild('chart', {static: false}) chart: IgxDoughnutChartComponent;

  constructor(private testCodeService: TestCodeService, private _sanitizer: DomSanitizer,
              private alertifyService: AlertifyService) {}

  ngOnInit() {
  }

  test(){
    this.isCompiling = true;
    
    let testCodeSend: TestCodeSend={
      codeJava: this.codeJava,
    }

    this.testCodeService.testCode(testCodeSend).subscribe(
      data => {   
        this.mapDataToDisplayInDataTree(data.codeTestClassInfo);
        this.mapInformationsForCharts(data.codeTestClassInfo);
        this.image = data.base64ImageRepresentation;
        this.graphGenerated = true;
        this.showGridData = true;
        this.showChart = true;
        this.isCompiling = false;
      },
      error => {
        this.isCompiling = false;
        this.alertifyService.errorServerConnection();
      });
  }

  mapInformationsForCharts(codeTestClassInfo: CodeTestClassInfoDTO[]){
    this.classInfoChart = [];
    this.methodesForChart = [];
    this.fieldsForChart = [];

    for(let i = 0; i < codeTestClassInfo.length; i++){
      let tempClassInfo: CodeTestClassChartsDTO = new CodeTestClassChartsDTO();
      tempClassInfo.fieldsInformations = [];
      tempClassInfo.methodesInformations = [];

      tempClassInfo.className = codeTestClassInfo[i].classInformations[0].parameterValue;

      //methodes
      tempClassInfo.methodesInformations.push( { parameterName: "static" , parameterValue: +codeTestClassInfo[i].classInformations[8].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "public" , parameterValue: +codeTestClassInfo[i].classInformations[9].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "private" , parameterValue: +codeTestClassInfo[i].classInformations[10].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "protected" , parameterValue: +codeTestClassInfo[i].classInformations[11].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "default" , parameterValue: +codeTestClassInfo[i].classInformations[12].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "abstract" , parameterValue: +codeTestClassInfo[i].classInformations[13].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "final" , parameterValue: +codeTestClassInfo[i].classInformations[14].parameterValue } );
      tempClassInfo.methodesInformations.push( { parameterName: "synchronized" , parameterValue: +codeTestClassInfo[i].classInformations[15].parameterValue } );

      //fields
      tempClassInfo.fieldsInformations.push( { parameterName: "static" , parameterValue: +codeTestClassInfo[i].classInformations[17].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "public" , parameterValue: +codeTestClassInfo[i].classInformations[18].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "private" , parameterValue: +codeTestClassInfo[i].classInformations[19].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "protected" , parameterValue: +codeTestClassInfo[i].classInformations[20].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "default" , parameterValue: +codeTestClassInfo[i].classInformations[21].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "final" , parameterValue: +codeTestClassInfo[i].classInformations[22].parameterValue } );
      tempClassInfo.fieldsInformations.push( { parameterName: "synchronized" , parameterValue: +codeTestClassInfo[i].classInformations[23].parameterValue } );

      this.classInfoChart.push(tempClassInfo);

    }
    this.methodesForChart = this.classInfoChart[0].methodesInformations;
    this.fieldsForChart = this.classInfoChart[0].fieldsInformations;
    this.selected = this.classInfoChart[0].className;

    this.checkIfContainsMethodesAndFields();
  }

  mapDataToDisplayInDataTree(codeTestClassInfo: CodeTestClassInfoDTO[]){
    this.codeTestClassInfo = [];
    this.classDataForTree =[];
    for(let i = 0; i < codeTestClassInfo.length; i++){
      let tempClassInfo: CodeClassStatisticDataTreeDTO = new CodeClassStatisticDataTreeDTO();
      tempClassInfo.methodes = [];
      
      tempClassInfo.className = codeTestClassInfo[i].classInformations[0].parameterValue;
      tempClassInfo.mcCabeComplexity = codeTestClassInfo[i].classInformations[3].parameterValue;
      tempClassInfo.linesOfCode = codeTestClassInfo[i].classInformations[25].parameterValue;
      tempClassInfo.returnQty = codeTestClassInfo[i].classInformations[26].parameterValue;
      tempClassInfo.loopQty = codeTestClassInfo[i].classInformations[27].parameterValue;

      tempClassInfo.comparisonsQty = codeTestClassInfo[i].classInformations[28].parameterValue;
      tempClassInfo.tryCatchQty = codeTestClassInfo[i].classInformations[29].parameterValue;
      tempClassInfo.stringLiteralsQty = codeTestClassInfo[i].classInformations[31].parameterValue;
      tempClassInfo.numbersQty = codeTestClassInfo[i].classInformations[32].parameterValue;
      tempClassInfo.variablesQty = codeTestClassInfo[i].classInformations[35].parameterValue;

      tempClassInfo.maxNestedBlocks = codeTestClassInfo[i].classInformations[36].parameterValue;
      tempClassInfo.logStatementsQty = codeTestClassInfo[i].classInformations[42].parameterValue;
      
      for(let j = 0; j < codeTestClassInfo[i].methodesInformations.length; j++){
        let tempMethodeInfo: CodeMethodeStatisticDataTreeDTO = new CodeMethodeStatisticDataTreeDTO();
        
        tempMethodeInfo.methodeName = codeTestClassInfo[i].methodesInformations[j].methodeInformations[1].parameterValue;
        tempMethodeInfo.mcCabeComplexity = codeTestClassInfo[i].methodesInformations[j].methodeInformations[5].parameterValue;
        tempMethodeInfo.linesOfCode = codeTestClassInfo[i].methodesInformations[j].methodeInformations[7].parameterValue;
        tempMethodeInfo.returnQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[8].parameterValue;
        tempMethodeInfo.loopQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[12].parameterValue;

        tempMethodeInfo.comparisonsQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[13].parameterValue;
        tempMethodeInfo.tryCatchQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[14].parameterValue;
        tempMethodeInfo.stringLiteralsQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[16].parameterValue;
        tempMethodeInfo.numbersQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[17].parameterValue;
        tempMethodeInfo.variablesQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[9].parameterValue;

        tempMethodeInfo.maxNestedBlocks = codeTestClassInfo[i].methodesInformations[j].methodeInformations[20].parameterValue;
        tempMethodeInfo.logStatementsQty = codeTestClassInfo[i].methodesInformations[j].methodeInformations[26].parameterValue;

        tempClassInfo.methodes.push(tempMethodeInfo);
      }
      this.classDataForTree.push(tempClassInfo);     
    }   
  }

  checkIfContainsMethodesAndFields(){
    this.fieldFlag = false;
    this.methodeFlag = false;

    for(let i = 0; i < this.fieldsForChart.length; i++){
      if(this.fieldsForChart[i].parameterValue > 0){
        this.fieldFlag = true;
        break;
      }
    }

    for(let i = 0; i < this.methodesForChart.length; i++){
      if(this.methodesForChart[i].parameterValue > 0){
        this.methodeFlag = true;
        break;
      }
    }
  }

  classChanged(value){
    this.methodesForChart = value.methodesInformations;
    this.fieldsForChart = value.fieldsInformations;
    this.selected = value.className;
    this.checkIfContainsMethodesAndFields();
  }

  testChart(){
    if(this.showChart == false){
      this.showChart = true;
    }else{
      this.showChart = false;
    }
  }
}
