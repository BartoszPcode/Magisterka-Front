import { SingleQuizDetails } from './singleQuizDetails';

export interface QuizCard{
    idCategory: number;
    quizCategoryTitle: string;
    quizes: SingleQuizDetails[];
    allPassed: boolean;

}

