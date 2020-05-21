
export class QuizQuestion{

    question: string;
    possibleAnswers: string[];
    correctAnswer: string;
    correctOrder: string[];
    
    pointsForQuestion: number;

    isAnswered: boolean;
    isAnsweredCorrectly: boolean;

    questionType: string;
    userAnswer: string; 
}
