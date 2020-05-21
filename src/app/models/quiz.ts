import { QuizQuestion } from './quizQuestion';

export class Quiz{

    quizId: number;
    quizQuestions: QuizQuestion[];

    quizTitle: string;
    maxPoints: number;
    //userPoints: number;
    pointsToPass: number;
    //userPassed: boolean;
    //tookPart: boolean;
    timeForQuiz: number;

}