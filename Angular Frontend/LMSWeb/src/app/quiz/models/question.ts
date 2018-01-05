import { Option } from './option';

export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        //debugger;
        data = data || {};
        this.id = data.guQuizId;
        this.name = data.question;
        this.options = [];
        data.options=JSON.parse(data.selectiveAnswers);
        data.options.forEach(o => {
            this.options.push(new Option(o));
        });
    }
}
