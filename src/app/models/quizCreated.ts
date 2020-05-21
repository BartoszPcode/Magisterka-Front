import { QuestionSingleChoiceDTO } from './questionSingleChoiceDTO';
import { QuestionBlocksOrdering } from './questionBlocksOrdering';

export class QuizCreated{
    categoryId: number;
    userId: number;
    quizName: string;
    pointsToPass: number;
    quizCreatedDate: Date;
    maxPoints: number;
    timeForQuiz: number;
    
    questionsSingleChoice: QuestionSingleChoiceDTO[];
    questionBlockOrdering: QuestionBlocksOrdering[];
}
