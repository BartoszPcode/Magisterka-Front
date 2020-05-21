import { SingleInformationDTO } from './singleInformationDTO';
import { CodeTestMethodeInfoDTO } from './codeTestMethodeInfoDTO';

export interface CodeTestClassInfoDTO{
    classInformations: SingleInformationDTO[];
    methodesInformations: CodeTestMethodeInfoDTO[];
}