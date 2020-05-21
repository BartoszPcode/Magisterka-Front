
export interface CodeAnalyzeInfoDTO{
    
    classNameToDisplay: string;
    classCyclomaticComplexity: number;
    functionsInClassToDisplay: string[];
    functionsCyclomaticComplexity: number[];
}