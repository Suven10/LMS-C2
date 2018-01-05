import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {
    id: number;
    name: string;
    description: string;
    config: QuizConfig;
    questions: Question[];

    constructor(data: any) {
        if (data) {
            this.name = data.name;
            this.id = data.guCourseId;
            this.config = new QuizConfig(data.config);
            this.questions = [];
            data.Quizes.forEach(q => {
                this.questions.push(new Question(q));
            });
        }
    }
}
