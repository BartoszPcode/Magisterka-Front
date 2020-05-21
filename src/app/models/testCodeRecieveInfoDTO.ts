import { CodeTestClassInfoDTO } from './codeTestClassInfoDTO';

export interface TestCodeRecieveInfoDTO{
    base64ImageRepresentation: string;
    codeTestClassInfo: CodeTestClassInfoDTO[];
}