
export interface QuizSummaryModel{

    quizTitle: string;
    maxPoints: number;
    pointsToPass: number;
    userPoints: number;
    passed: boolean;
    questionsNumber: number;
    correctAnswers: number;

}
