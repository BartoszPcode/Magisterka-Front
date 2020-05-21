import { CodeMethodeStatisticDataTreeDTO } from './codeMethodeStatisticDataTreeDTO';

export class CodeClassStatisticDataTreeDTO{  
    className: string;
    mcCabeComplexity: string;
    linesOfCode: string;
    returnQty: string;
    loopQty: string;
    comparisonsQty: string;
    tryCatchQty: string;
    stringLiteralsQty: string;
    numbersQty: string;
    variablesQty: string;
    maxNestedBlocks: string;
    logStatementsQty: string;
    methodes: CodeMethodeStatisticDataTreeDTO[];
}