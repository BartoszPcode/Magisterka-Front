import { PlagiarismComparisonElementDTO } from './plagiarismComparisonElementDTO';

export interface ExerciseAnswerForTeacherDTO
{
    number: number;
    albumNo: string;
    groupName: string;
    idExerciseAnswer: number;
    exerciseUserAnswer: string;
    exerciseAnswerDate: Date;
    plagiarismByComputer: boolean;
    plagiarismByTeacher: boolean;
    waitingForTeacherVerification: boolean;
    plagiarismElements: PlagiarismComparisonElementDTO[];
    exerciseClick: boolean;
}